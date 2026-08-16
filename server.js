import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase client - usar SECRET_KEY en backend (más seguro que ANON_KEY)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// ===== ENDPOINTS =====

// GET: Obtener siguiente número de turno
app.get('/api/siguiente-turno', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('turnos_contador')
      .select('numero_actual, fecha_reinicio')
      .eq('id', 1)
      .single();

    if (error) throw error;

    // Reiniciar si es nuevo día
    const hoy = new Date().toISOString().split('T')[0];
    const fechaGuardada = new Date(data.fecha_reinicio).toISOString().split('T')[0];

    if (hoy !== fechaGuardada) {
      await supabase
        .from('turnos_contador')
        .update({ numero_actual: 0, fecha_reinicio: new Date() })
        .eq('id', 1);
      return res.json({ numero: 1 });
    }

    res.json({ numero: data.numero_actual + 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear pedido
app.post('/api/pedidos', upload.single('archivo'), async (req, res) => {
  try {
    const { cliente_nombre, copias, color, tamaño, caras, paginas } = req.body;
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ error: 'Archivo requerido' });
    }

    // Obtener siguiente turno
    const { data: contadorData, error: contadorError } = await supabase
      .from('turnos_contador')
      .select('numero_actual')
      .eq('id', 1)
      .single();

    if (contadorError) throw contadorError;

    const nuevoNumero = contadorData.numero_actual + 1;
    const turno = `A-${String(nuevoNumero).padStart(3, '0')}`;

    // Actualizar contador
    await supabase
      .from('turnos_contador')
      .update({ numero_actual: nuevoNumero })
      .eq('id', 1);

    // Guardar archivo en Supabase Storage
    const nombreArchivo = `${uuidv4()}_${archivo.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pedidos')
      .upload(`${nuevoNumero}/${nombreArchivo}`, archivo.buffer, {
        contentType: archivo.mimetype,
      });

    if (uploadError) throw uploadError;

    // Calcular precio (base: $1, color: 1.5x, ambas caras: 1.2x)
    const precioBase = 1;
    const precioColor = color === 'color' ? 1.5 : 1;
    const precioCares = caras === 'ambas' ? 1.2 : 1;
    const precio = (precioBase * precioColor * precioCares * copias).toFixed(2);

    // Crear registro de pedido
    const { data: pedidoData, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([
        {
          turno,
          cliente_nombre: cliente_nombre || null,
          archivo_nombre: archivo.originalname,
          archivo_size: archivo.size,
          copias: parseInt(copias),
          color,
          tamaño,
          caras,
          paginas,
          estado: 'nuevo',
          precio: parseFloat(precio),
        }
      ])
      .select()
      .single();

    if (pedidoError) throw pedidoError;

    // Guardar referencia del archivo
    await supabase.from('archivos').insert([
      {
        pedido_id: pedidoData.id,
        nombre_original: archivo.originalname,
        nombre_almacenado: nombreArchivo,
        tipo_archivo: archivo.mimetype,
        tamaño: archivo.size,
        ruta_supabase: uploadData.path,
      }
    ]);

    res.json({
      turno,
      cliente_nombre: cliente_nombre || 'Sin nombre',
      archivo: archivo.originalname,
      copias,
      color,
      tamaño,
      caras,
      paginas,
      precio
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener todos los pedidos (panel encargado)
app.get('/api/pedidos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener un pedido específico
app.get('/api/pedidos/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH: Actualizar estado de pedido
app.patch('/api/pedidos/:id', async (req, res) => {
  try {
    const { estado } = req.body;

    const { data, error } = await supabase
      .from('pedidos')
      .update({ estado, updated_at: new Date() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Descargar archivo
app.get('/api/descargar/:pedidoId', async (req, res) => {
  try {
    const { data: archivo, error: archivoError } = await supabase
      .from('archivos')
      .select('*')
      .eq('pedido_id', req.params.pedidoId)
      .single();

    if (archivoError) throw archivoError;

    const { data: fileData, error: downloadError } = await supabase.storage
      .from('pedidos')
      .download(archivo.ruta_supabase);

    if (downloadError) throw downloadError;

    res.setHeader('Content-Type', archivo.tipo_archivo);
    res.setHeader('Content-Disposition', `attachment; filename="${archivo.nombre_original}"`);
    res.send(Buffer.from(await fileData.arrayBuffer()));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Servir archivos estáticos (frontend)
app.use(express.static('public'));

// Catch all - servir index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
