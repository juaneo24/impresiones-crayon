# ⚙️ Configuración en Vercel

## 🔑 Variables de Entorno

En Vercel dashboard, ve a **Settings → Environment Variables** y añade EXACTAMENTE estas:

### Variables Necesarias:

| Variable | Valor | Dónde |
|----------|-------|-------|
| `VITE_SUPABASE_URL` | `https://hzmdonzqayybifpzqtnb.supabase.co` | Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_ncwwe0eQjQD-KdgcjYaQxg__cBVlah0` | Supabase → Settings → API → Anon Key |
| `SUPABASE_SECRET_KEY` | `sb_secret_isF32VsXb5MaD9TqrGIv9A_QB88D2qK` | Supabase → Settings → API → Service Role |

### Importante:
- **ANON_KEY** = Clave pública (va en frontend, segura)
- **SECRET_KEY** = Clave privada (SOLO en servidor Vercel)
- ❌ Nunca compartas la SECRET_KEY públicamente

---

## 🚀 Paso a Paso

### 1. Ve a tu proyecto en Vercel
```
https://vercel.com/dashboard/projects/impresiones-crayon
```

### 2. Abre Settings
```
Project → Settings (tab superior)
```

### 3. Environment Variables (lado izquierdo)
```
Settings → Environment Variables
```

### 4. Añade las 3 variables
Haz clic en **"Add"** para cada una:

```
Nombre: VITE_SUPABASE_URL
Valor: https://hzmdonzqayybifpzqtnb.supabase.co
```

```
Nombre: VITE_SUPABASE_ANON_KEY
Valor: sb_publishable_ncwwe0eQjQD-KdgcjYaQxg__cBVlah0
```

```
Nombre: SUPABASE_SECRET_KEY
Valor: sb_secret_isF32VsXb5MaD9TqrGIv9A_QB88D2qK
```

### 5. Después de agregar, haz clic en "Save"

### 6. Redeploy automático
Vercel redesplegará el sitio automáticamente con las nuevas variables.

---

## ✅ Verificación

Después de desplegar, verifica que funcione:

1. **Cliente**: Abre https://impresionescrayon.com
   - ¿Se carga la interfaz?
   - ¿Puedes cargar un archivo?

2. **Panel**: Abre https://impresionescrayon.com/manager.html
   - ¿Se conecta a Supabase?
   - ¿Muestra "Conectado" en la esquina?

3. **API**: Abre https://impresionescrayon.com/api/health
   - ¿Responde con `{"status":"ok"}`?

---

## 🆘 Si dice Error

### "Cannot find module @supabase"
→ Vercel no instaló dependencias
→ Solución: Espera 2-3 minutos, haz redeploy manual

### "SUPABASE_URL undefined"
→ La variable de entorno no se guardó
→ Solución: Comprueba que está en Settings → Environment Variables

### "Cannot upload file"
→ Bucket "pedidos" no existe en Storage
→ Solución: Ve a Supabase → Storage → Crea bucket "pedidos" (público)

### "Panel dice Error"
→ SECRET_KEY incorrecta
→ Solución: Copia exactamente de Supabase → Settings → API

---

## 🔄 Redeploy Manual (si necesitas)

1. Ve a **Deployments** (tab superior)
2. Busca el deployment más reciente
3. Haz clic en los **3 puntos** → **Redeploy**
4. Espera 1-2 minutos

---

## 📝 Notas de Seguridad

✅ **ANON_KEY en Vercel** = Seguro (es pública)
✅ **SECRET_KEY en Vercel** = Seguro (Vercel encripta variables)
❌ **Nunca** compartas SECRET_KEY por chat, email, etc.
❌ **Nunca** la guardes en Git (está en .gitignore)

---

¿Necesitas ayuda? Avísame en qué paso te atoras 🚀
