# 🚀 Inicio Rápido - Impresiones Crayón

## ⚡ En 5 minutos tu sistema estará en vivo

### Paso 1️⃣: Obtener claves de Supabase

Ve a: https://app.supabase.com/projects

- Haz clic en proyecto "crayon"
- Ve a **Settings → API**
- **Copia estas dos cosas:**
  ```
  🔗 Project URL: https://hzmdonzqayybifpzqtnb.supabase.co
  🔑 Anon Key: (clave larga que empieza con eyJ...)
  ```

### Paso 2️⃣: Crear Storage en Supabase

Aún en Supabase:
- Haz clic en **Storage** (lado izquierdo)
- Clic en **Create a new bucket**
- Nombre: `pedidos`
- Selecciona **Public**
- Clic en **Create bucket**

### Paso 3️⃣: Subir a Vercel

#### Opción A (MÁS FÁCIL - Sin Git):

1. Ve a: https://vercel.com/new
2. Selecciona: **Other → Clone Git Repository**
3. Ingresa cualquier nombre
4. Copia los archivos a la carpeta:
   ```
   ├── server.js
   ├── package.json
   ├── vercel.json
   ├── .env.local (crea este archivo)
   └── public/
       ├── index.html
       └── manager.html
   ```

5. En `.env.local` escribe:
   ```
   VITE_SUPABASE_URL=https://hzmdonzqayybifpzqtnb.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_aqui
   PORT=3001
   NODE_ENV=production
   ```

6. Desde terminal en la carpeta:
   ```bash
   git push
   ```

7. En Vercel dashboard:
   - Ve a **Settings → Environment Variables**
   - Añade las dos variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

8. Clic en **Redeploy**

---

#### Opción B (Git + GitHub):

1. Crea repo en GitHub: `impresiones-crayon`
2. En tu PC:
   ```bash
   git clone https://github.com/tu-usuario/impresiones-crayon
   cd impresiones-crayon
   
   # Copia los archivos aquí
   
   git add .
   git commit -m "Initial commit"
   git push
   ```

3. En Vercel: https://vercel.com/new
   - **Import Git Repository** → selecciona repo
   - **Environment Variables** (los mismos)
   - **Deploy**

---

### Paso 4️⃣: Conectar Tu Dominio

En Vercel dashboard del proyecto:
- Ve a **Settings → Domains**
- Agrega `impresionescrayon.com`
- Sigue las instrucciones de DNS

---

## 📱 URLs Finales

- **Para clientes (QR):** `https://impresionescrayon.com`
- **Panel encargado:** `https://impresionescrayon.com/manager.html`

---

## 🎨 Personalizar (opcional)

### Cambiar logo emoji
En `public/index.html` y `public/manager.html`:
- Busca `🖨️`
- Cambia a tu emoji favorito (ej: 🖇️ 📎 ✒️)

### Cambiar precios
En `server.js` línea ~120:
```javascript
const precioBase = 1;        // $ 1 por copia
const precioColor = 1.5;     // Color cuesta 1.5x
const precioCares = 1.2;     // Ambas caras cuesta 1.2x
```

---

## 🆘 Si algo no funciona

**Error: "Cannot find module"**
→ Falta hacer `npm install`

**Error: "CORS blocked"**
→ Variables de entorno no están configuradas en Vercel

**Panel dice "Error"**
→ Espera 5 segundos y recarga la página

**Archivos no suben**
→ Comprueba que el bucket `pedidos` existe en Supabase Storage

---

## ✅ Checklist Final

- [ ] Tengo las claves de Supabase
- [ ] Creé bucket `pedidos` en Storage
- [ ] Subi código a GitHub o Vercel
- [ ] Configuré variables de entorno
- [ ] Conecté el dominio `impresionescrayon.com`
- [ ] Puedo ver la página en `impresionescrayon.com`
- [ ] Puedo ver panel en `impresionescrayon.com/manager.html`

---

¡Listo! Tu sistema está en vivo 🎉
