import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { cliente_nombre, copias, color, tamaño, caras, paginas } = req.body;
    
    try {
      const { data: contadorData } = await supabase
        .from('turnos_contador')
        .select('numero_actual')
        .eq('id', 1)
        .single();

      const nuevoNumero = contadorData.numero_actual + 1;
      const turno = `A-${String(nuevoNumero).padStart(3, '0')}`;

      await supabase
        .from('turnos_contador')
        .update({ numero_actual: nuevoNumero })
        .eq('id', 1);

      const precioBase = 1;
      const precioColor = color === 'color' ? 1.5 : 1;
      const precioCares = caras === 'una' ? 1 : 1.2;
      const precio = (precioBase * precioColor * precioCares * copias).toFixed(2);

      const { data: pedidoData } = await supabase
        .from('pedidos')
        .insert([
          {
            turno,
            cliente_nombre: cliente_nombre || null,
            archivo_nombre: 'archivo',
            copias: parseInt(copias),
            color,
            tamaño,
            caras,
            paginas,
            estado: 'nuevo',
            precio: parseFloat(precio)
          }
        ])
        .select()
        .single();

      return res.json({ turno, precio });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PATCH') {
    const { estado } = req.body;
    const { id } = req.query;

    const { data } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', id)
      .select()
      .single();

    return res.json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}