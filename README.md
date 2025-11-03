# 🏥 TurnosApp - Sistema de Turnos 12×36

Aplicación web para gestionar turnos de trabajo con sistema de rotación 12×36 (12 horas de trabajo, 36 horas de descanso) usando PostgreSQL en Railway.

![React](https://img.shields.io/badge/React-19-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.4-purple.svg)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-green.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)
![Railway](https://img.shields.io/badge/Railway-Ready-orange.svg)

## 🚀 Características

- ✅ **Calendario Visual Interactivo** - Interfaz intuitiva para ver los turnos de cada día
- ✅ **Filtro de Usuarios** - Selecciona un usuario para ver solo sus turnos resaltados
- ✅ **Cálculo Automático** - Sistema que calcula automáticamente quién trabaja cada día
- ✅ **Configuración Flexible** - Cambiar nombres, colores y fecha de inicio
- ✅ **Estadísticas Visuales** - Gráficos y análisis de distribución de turnos
- ✅ **Base de Datos PostgreSQL** - Almacenamiento persistente en Railway
- ✅ **API RESTful** - Backend con Express y Node.js
- ✅ **Diseño Responsive** - Optimizado para desktop, tablet y móvil

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.x | Framework principal (Frontend) |
| **Vite** | 7.x | Build tool y dev server |
| **Redux Toolkit** | 2.x | Manejo de estado global |
| **Express** | 4.x | Servidor backend |
| **PostgreSQL** | 15+ | Base de datos |
| **Node.js** | 18+ | Runtime del servidor |
| **React Router** | v7 | Navegación entre páginas |
| **React Hook Form** | 7.x | Manejo de formularios |
| **Lucide React** | Latest | Iconos modernos |
| **Recharts** | 3.x | Gráficos y visualizaciones |

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- PostgreSQL (para desarrollo local) o cuenta en Railway (para producción)

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/turnos-app.git
cd turnos-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/turnos_app
PORT=3001
NODE_ENV=development
```

### 4. Configurar PostgreSQL local (opcional)

Si quieres probar localmente, necesitas PostgreSQL:

```bash
# Crear base de datos
createdb turnos_app

# O usando psql
psql -U postgres
CREATE DATABASE turnos_app;
```

### 5. Ejecutar la aplicación

**Opción A: Ejecutar todo junto (recomendado)**
```bash
npm run dev:all
```

**Opción B: Ejecutar por separado**

Terminal 1 - Backend:
```bash
npm run dev:server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 6. Acceder a la aplicación

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## 🚂 Despliegue en Railway

### Paso 1: Preparar el proyecto

```bash
git add .
git commit -m "Preparar para Railway"
git push
```

### Paso 2: Crear proyecto en Railway

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Conecta tu repositorio

### Paso 3: Agregar PostgreSQL

1. En tu proyecto, haz clic en "New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente la base de datos

### Paso 4: Configurar Variables de Entorno

En tu servicio de Railway, ve a "Variables" y agrega:

```
NODE_ENV=production
PORT=${{PORT}}
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Paso 5: Desplegar

Railway detectará automáticamente el proyecto y comenzará a desplegar. Una vez completado, obtendrás una URL pública.

📖 **Guía completa de despliegue**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📅 Sistema de Turnos

### Lógica del Sistema 12×36:
- El primer trabajador (orden 1) inicia los turnos según la fecha configurada
- **Alternancia automática**: Trabajador 1 → Trabajador 2 → Trabajador 1 → Trabajador 2...
- **12 horas** de trabajo seguidas de **36 horas** de descanso
- **Cálculo preciso** para cualquier fecha pasada o futura

### Ejemplo de Rotación:
```
Lunes 8 Sep    → Carmen Hernández (orden 1)
Martes 9 Sep   → Azucena Hernández (orden 2)
Miércoles 10   → Carmen Hernández (orden 1)
Jueves 11      → Azucena Hernández (orden 2)
...
```

## 📁 Estructura del Proyecto

```
turnos-app/
├── server/
│   ├── index.js              # Servidor Express principal
│   ├── database/
│   │   └── init.js           # Inicialización de BD
│   └── routes/
│       ├── usuarios.js       # Rutas de usuarios
│       └── configuracion.js  # Rutas de configuración
├── src/
│   ├── components/
│   │   ├── CalendarioSimple.jsx
│   │   ├── ConfiguracionSimple.jsx
│   │   ├── EstadisticasSimples.jsx
│   │   └── NavbarSimple.jsx
│   ├── services/
│   │   └── api.js            # Servicio de API
│   ├── store/
│   │   ├── index.js
│   │   └── turnosSlice.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── railway.json              # Configuración de Railway
└── DEPLOYMENT.md             # Guía de despliegue
```

## 🔌 API Endpoints

### Configuración
- `GET /api/configuracion` - Obtener configuración completa (config + usuarios)
- `PUT /api/configuracion` - Actualizar fecha de inicio

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `POST /api/usuarios` - Crear un nuevo usuario

### Health Check
- `GET /api/health` - Verificar estado del servidor

## 📱 Características Móviles

- ✅ Meta tags específicos para PWA
- ✅ Prevención de zoom en inputs
- ✅ Área táctil mínima de 44px
- ✅ Compatibilidad con notch (iPhone X+)
- ✅ Diseño responsive completo

## 🗄️ Esquema de Base de Datos

### Tabla: `usuarios`
- `id` (SERIAL PRIMARY KEY)
- `nombre` (VARCHAR)
- `color` (VARCHAR) - Color hexadecimal
- `orden` (INTEGER) - Orden de turno
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: `configuracion`
- `id` (SERIAL PRIMARY KEY)
- `fecha_inicio` (DATE) - Fecha de inicio del sistema
- `usuario_inicial_id` (INTEGER) - ID del usuario que inicia
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (solo frontend)
npm run dev:server   # Servidor backend
npm run dev:all      # Ambos servidores (recomendado)
npm run build        # Construir para producción
npm start            # Iniciar servidor en producción
npm run lint         # Verificar código con ESLint
```

## 🎯 Mejoras Implementadas

### Desde LocalStorage a PostgreSQL:
- ✅ Migración completa a base de datos PostgreSQL
- ✅ API RESTful para todas las operaciones
- ✅ Sincronización automática entre frontend y backend
- ✅ Inicialización automática de datos por defecto
- ✅ Manejo de errores mejorado

### Nuevas Funcionalidades:
- ✅ Filtro de usuarios en el calendario
- ✅ Resaltado visual de turnos por usuario
- ✅ Carga automática de datos al iniciar
- ✅ Estados de carga y error

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador** - Aplicación creada para gestionar turnos de trabajo con sistema 12×36

---

**💡 Tip**: Para mejor experiencia móvil, agrega la aplicación a tu pantalla de inicio desde Safari (iOS) o Chrome (Android).
