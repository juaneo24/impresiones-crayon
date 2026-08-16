# 📋 Checklist de Deployment

Sigue estos pasos en orden para desplegar a **impresionescrayon.com**

---

## ✅ Fase 1: Preparar en Supabase

- [ ] Ve a https://app.supabase.com/projects
- [ ] Abre proyecto **crayon**
- [ ] Ve a **Storage** (lado izquierdo)
- [ ] Crea un nuevo bucket:
  - [ ] Nombre: `pedidos`
  - [ ] Tipo: **Public**
  - [ ] Clic: **Create bucket**

✅ **Supabase listo!**

---

## ✅ Fase 2: Preparar archivos locales

En tu computadora:

1. **Crea carpeta:** `impresiones-crayon`

2. **Descarga estos archivos:**
   ```
   ├── server.js
   ├── package.json
   ├── vercel.json
   ├── .env.local (copia el del chat)
   ├── .gitignore
   ├── README.md
   ├── INICIO_RAPIDO.md
   ├── VERCEL_SETUP.md
   ├── DEPLOY_CHECKLIST.md (este archivo)
   └── public/
       ├── index.html (renombra public-index.html)
       └── manager.html (renombra public-manager.html)
   ```

3. **Verificar estructura:**
   ```bash
   ls -la impresiones-crayon/
   # Deberías ver: server.js, package.json, public/ etc.
   ```

✅ **Archivos listos!**

---

## ✅ Fase 3: Crear repositorio en GitHub

- [ ] Ve a https://github.com/new
- [ ] **Repository name:** `impresiones-crayon`
- [ ] **Description:** Sistema de pedidos por QR - Impresiones Crayón
- [ ] **Public** ✅
- [ ] **Add .gitignore:** Already have it ✅
- [ ] Clic: **Create repository**

✅ **Repo creado!**

---

## ✅ Fase 4: Subir código a GitHub

En tu terminal (en la carpeta `impresiones-crayon`):

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Imprime por QR system"

# Conectar a tu repo (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/impresiones-crayon.git

# Subir a main
git branch -M main
git push -u origin main
```

- [ ] ¿Repo subido a GitHub?

✅ **Código en GitHub!**

---

## ✅ Fase 5: Conectar a Vercel

- [ ] Ve a https://vercel.com/new
- [ ] Haz login con GitHub
- [ ] **Select a Git Repository:**
  - Busca: `impresiones-crayon`
  - Clic: **Select**

- [ ] **Import Project:**
  - Project Name: `impresiones-crayon` ✅
  - Framework: **Other** ✅
  - Clic: **Continue**

- [ ] **Environment Variables:**
  - [ ] `VITE_SUPABASE_URL` = `https://hzmdonzqayybifpzqtnb.supabase.co`
  - [ ] `VITE_SUPABASE_ANON_KEY` = `sb_publishable_ncwwe0eQjQD-KdgcjYaQxg__cBVlah0`
  - [ ] `SUPABASE_SECRET_KEY` = `sb_secret_isF32VsXb5MaD9TqrGIv9A_QB88D2qK`
  - Clic: **Add**

- [ ] Clic: **Deploy**

⏳ Espera 2-3 minutos...

✅ **Deployed en Vercel!**

---

## ✅ Fase 6: Conectar Dominio

En Vercel (tu nuevo proyecto):

- [ ] Ve a **Settings** (tab superior)
- [ ] **Domains** (lado izquierdo)
- [ ] **Add Domain:**
  - Ingresa: `impresionescrayon.com`
  - Clic: **Add**

- [ ] Vercel te mostrará registros DNS
- [ ] Copia estos registros a tu proveedor de dominio (¿dónde compraste el dominio?)
  - Puede ser GoDaddy, NameCheap, Google Domains, etc.

- [ ] Espera 5-10 minutos a que DNS se actualice

- [ ] Verifica: https://impresionescrayon.com ✅

✅ **Dominio conectado!**

---

## ✅ Fase 7: Verificación Final

Prueba que todo funciona:

- [ ] **Cliente:** https://impresionescrayon.com
  - [ ] ¿Se carga la interfaz?
  - [ ] ¿Puedo seleccionar archivo?
  - [ ] ¿Puedo ir a paso 2 y 3?

- [ ] **Panel:** https://impresionescrayon.com/manager.html
  - [ ] ¿Se carga el dashboard?
  - [ ] ¿Dice "Conectado" arriba?
  - [ ] ¿Muestra "Sin pedidos"?

- [ ] **API:** https://impresionescrayon.com/api/health
  - [ ] ¿Responde `{"status":"ok"}`?

✅ **¡Todo funciona!**

---

## 🎉 ¡Listo para Usar!

Ahora puedes:

1. **Imprimir QR** de https://impresionescrayon.com
2. **Ponerlo en el mostrador**
3. **Clientes escanean → Suben archivos → Turno!**
4. **Panel en https://impresionescrayon.com/manager.html**

---

## 🆘 Si algo falla...

| Problema | Solución |
|----------|----------|
| "Cannot find module" | Espera a que Vercel instale npm packages (2-3 min) |
| "SUPABASE_URL undefined" | Verifica variables en Settings → Environment Variables |
| "Archivo no sube" | Crea bucket "pedidos" en Supabase Storage |
| "Panel dice Error" | Comprueba que SECRET_KEY esté correcta |
| "Dominio no funciona" | Espera 10-15 min a que DNS actualice |

---

## 📞 Si necesitas ayuda

Cuéntame en qué paso te atoras:
1. ¿En qué fase estás? (1-7)
2. ¿Qué error ves?
3. Comparte screenshot si puedes

Estoy aquí 🚀
