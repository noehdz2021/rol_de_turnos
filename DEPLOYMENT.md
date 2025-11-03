# 🚀 Guía de Despliegue en Railway

Esta guía te ayudará a desplegar la aplicación TurnosApp en Railway con PostgreSQL.

## 📋 Requisitos Previos

1. Cuenta en [Railway](https://railway.app)
2. Git instalado
3. Repositorio en GitHub (recomendado)

## 🔧 Paso 1: Preparar el Proyecto

1. Asegúrate de que todos los cambios estén commiteados:
```bash
git add .
git commit -m "Preparar para Railway"
git push
```

## 🚂 Paso 2: Crear Proyecto en Railway

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo" (o "Deploy from Git repo")
4. Conecta tu repositorio y selecciona el proyecto

## 🗄️ Paso 3: Agregar Base de Datos PostgreSQL

1. En tu proyecto de Railway, haz clic en "New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos PostgreSQL
4. Copia la variable de entorno `DATABASE_URL` que Railway genera automáticamente

## ⚙️ Paso 4: Configurar Variables de Entorno

1. En tu servicio de Railway (el que tiene tu código), ve a "Variables"
2. Agrega las siguientes variables:

```
NODE_ENV=production
NODE_VERSION=20
PORT=${{PORT}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

Notas:
- `NODE_VERSION=20` es necesario porque algunas dependencias requieren Node.js 20+
- `${{Postgres.DATABASE_URL}}` es la referencia automática a la base de datos PostgreSQL que creaste
- Railway también detectará Node.js 20 desde el archivo `.nvmrc` en el repositorio

## 🔨 Paso 5: Configurar el Build

Railway detectará automáticamente que es un proyecto Node.js. Asegúrate de que:

1. El **Root Directory** esté vacío (raíz del proyecto)
2. El **Build Command** sea: `npm run build`
3. El **Start Command** sea: `npm start`

Railway debería detectar esto automáticamente, pero puedes configurarlo en:
- Settings → Build & Deploy

## 📦 Paso 6: Desplegar

1. Railway comenzará a desplegar automáticamente cuando detecte cambios
2. Puedes ver el progreso en la pestaña "Deployments"
3. Una vez completado, Railway te dará una URL pública (ej: `https://tu-app.up.railway.app`)

## ✅ Paso 7: Verificar el Despliegue

1. Abre la URL que Railway te proporcionó
2. La aplicación debería cargar y conectarse a la base de datos
3. Los datos por defecto (Carmen y Azucena) se crearán automáticamente la primera vez

## 🔍 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que la variable `DATABASE_URL` esté correctamente configurada
- Asegúrate de que el servicio de PostgreSQL esté activo en Railway

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` localmente para verificar que no haya errores

### La aplicación no carga
- Revisa los logs en Railway → Deployments → Logs
- Verifica que el puerto sea correcto (Railway usa `$PORT`)

### Base de datos vacía
- Los datos por defecto se crean automáticamente al iniciar el servidor
- Si no aparecen, revisa los logs del servidor en Railway

## 📝 Notas Importantes

1. **Primera Ejecución**: La primera vez que se ejecute, el servidor creará automáticamente las tablas y datos por defecto.

2. **Variables de Entorno**: Railway proporciona automáticamente `PORT` y `DATABASE_URL` cuando usas su servicio de PostgreSQL.

3. **Actualizaciones**: Cada push a tu repositorio activará un nuevo despliegue automáticamente.

4. **Dominio Personalizado**: Puedes agregar un dominio personalizado en Settings → Domains.

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en Railway. Si tienes problemas, revisa los logs en Railway o abre un issue en el repositorio.

