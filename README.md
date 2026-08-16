# Impresiones Crayón - Sistema de Pedidos Online

Sistema web de recepción de archivos por QR para Impresiones Crayón en Mexicali.

---

## 🚀 Despliegue Rápido en Vercel

### 1. Obtener Claves de Supabase

1. Accede a tu proyecto: https://app.supabase.com/projects
2. Ve a **Settings → API**
3. Copia:
   - **Project URL** (ej: `https://hzmdonzqayybifpzqtnb.supabase.co`)
   - **Anon (public) Key** (clave larga de cifrado)

### 2. Crear Bucket en Supabase (Storage)

1. En tu proyecto, ve a **Storage**
2. Crea un nuevo bucket llamado `pedidos`
3. En políticas, elige **Public** (para descargas)

### 3. Desplegar en Vercel

#### Opción A: Usando Git + GitHub

```bash
# 1. Crea un repo en GitHub
git clone https://github.com/tu-usuario/impresiones-crayon
cd impresiones-crayon

# 2. Copia todos los archivos:
# - server.js
# - package.json
# - vercel.json
# - .env.example → .env.local
# - public/index.html (renombra public-index.html)
# - public/manager.html (renombra public-manager.html)

# 3. Copia .env.example a .env.local y llena:
cp .env.example .env.local

# 4. Git push
git add .
git commit -m "Initial commit"
git push -u origin main
```

**En Vercel:**
1. Ve a https://vercel.com/new
2. **Import Git Repository** → selecciona tu repo
3. **Environment Variables:**
   - `VITE_SUPABASE_URL`: Tu Project URL
   - `VITE_SUPABASE_ANON_KEY`: Tu Anon Key
4. **Deploy!**

#### Opción B: Usando Vercel CLI

```bash
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod --env VITE_SUPABASE_URL=tu_url --env VITE_SUPABASE_ANON_KEY=tu_key
```

#### Opción C: Manual (sin Git)

1. Ve a https://vercel.com/new
2. **Other → Create Git Repository** (crear vacío)
3. Sube los archivos vía GitHub Desktop o comando git
4. Agrega las variables de entorno en Vercel dashboard

---

## 🔗 URLs Después del Despliegue

- **Cliente (QR):** `https://impresionescrayon.com/`
- **Panel Encargado:** `https://impresionescrayon.com/manager.html`
- **API Health:** `https://impresionescrayon.com/api/health`

---

## 🗂️ Estructura de Carpetas

```
impresiones-crayon/
├── server.js              # Backend Express
├── package.json           # Dependencias
├── vercel.json           # Config Vercel
├── .env.example          # Template vars
├── README.md             # Este archivo
└── public/
    ├── index.html        # Frontend cliente
    └── manager.html      # Panel encargado
```

---

## 📋 Variables de Entorno Necesarias

Copia `.env.example` a `.env.local`:

```env
# Supabase
VITE_SUPABASE_URL=https://hzmdonzqayybifpzqtnb.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_aqui

# Server
PORT=3001
NODE_ENV=production
```

---

## 🎨 Personalización

### Cambiar Logo
- En `public/index.html` y `public/manager.html`, reemplaza `🖨️` con tu emoji o imagen

### Cambiar Colores
- Naranja: `#FF6B35`
- Rojo: `#FF4444`
- Amarillo: `#FFD700`
- Azul: `#00A8E8`
- Verde: `#22C55E`

Edita los valores hex en los archivos HTML.

### Cambiar Precios
En `server.js`, línea ~120:
```javascript
const precioBase = 1; // Cambiar aquí
const precioColor = color === 'color' ? 1.5 : 1;
const precioCares = caras === 'ambas' ? 1.2 : 1;
```

---

## 🔐 Seguridad

- ✅ Las claves están en `.env.local` (no en código)
- ✅ Supabase maneja autenticación
- ✅ Storage está público solo para lectura (descarga)
- ✅ No hay credenciales en git

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Correr servidor
npm run dev

# Acceder a:
# - Cliente: http://localhost:3001/
# - Encargado: http://localhost:3001/manager.html
```

---

## 📱 Dispositivos Soportados

- ✅ iPhone/iPad (iOS 14+)
- ✅ Android (Android 8+)
- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Datos móviles y Wi-Fi

---

## 🆘 Troubleshooting

### Error: "CORS"
→ El servidor Express tiene CORS habilitado. Si persiste, verifica `server.js` línea 12.

### Error: "Archivo rechazado"
→ Solo PDF, Word, JPG, PNG. Verifica el tipo de archivo.

### Archivos no suben
→ Comprueba Storage en Supabase está creado (`pedidos` bucket).

### Panel no muestra pedidos
→ Espera 3 segundos (refresco automático) o haz clic en "🔄 Actualizar".

---

## 📞 Soporte

Para problemas:
1. Verifica las variables de entorno
2. Revisa logs en Vercel dashboard
3. Comprueba Storage está público en Supabase

---

**Versión:** 1.0.0  
**Última actualización:** 2026-08-16  
**Tecnología:** Express.js + Supabase + Vercel
