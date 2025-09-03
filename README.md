# 🏥 TurnosApp - Sistema de Turnos 12×36

Aplicación web para gestionar turnos de trabajo entre **Azucena Hernández** y **Carmen Hernández** con sistema de rotación 12×36 (12 horas de trabajo, 36 horas de descanso).

![React](https://img.shields.io/badge/React-18-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.4-purple.svg)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-green.svg)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-orange.svg)

## 🚀 Demo en Vivo

```bash
git clone https://github.com/tu-usuario/turnos-app.git
cd turnos-app
npm install
npm run dev
```

Luego abre `http://localhost:5173/` en tu navegador.

## 📱 Características

- ✅ **Calendario Visual Interactivo** - Interfaz intuitiva para ver los turnos de cada día
- ✅ **Cálculo Automático** - Sistema que calcula automáticamente quién trabaja cada día
- ✅ **Configuración Flexible** - Cambiar nombres, colores y fecha de inicio
- ✅ **Estadísticas Visuales** - Gráficos y análisis de distribución de turnos
- ✅ **Almacenamiento Persistente** - Los datos se guardan automáticamente en LocalStorage
- ✅ **Diseño Responsive** - Optimizado para desktop, tablet y móvil
- ✅ **Compatible Safari/iOS** - Funciona perfectamente en dispositivos Apple
- ✅ **Navegación Rápida** - Botón "Hoy" para ir directamente a la fecha actual

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.x | Framework principal |
| **Vite** | 7.x | Build tool y dev server |
| **Redux Toolkit** | 2.x | Manejo de estado global |
| **React Router** | v6 | Navegación entre páginas |
| **React Hook Form** | 7.x | Manejo de formularios |
| **Lucide React** | Latest | Iconos modernos |
| **Recharts** | 3.x | Gráficos y visualizaciones |
| **CSS Vanilla** | - | Estilos responsive |

## 📅 Sistema de Turnos

### Lógica del Sistema 12×36:
- **Carmen Hernández** inicia los turnos (fecha configurable)
- **Alternancia diaria automática**: Carmen → Azucena → Carmen → Azucena...
- **12 horas** de trabajo seguidas de **36 horas** de descanso
- **Cálculo preciso** para cualquier fecha pasada o futura

### Ejemplo de Rotación:
```
Lunes 8 Sep    → Carmen Hernández
Martes 9 Sep   → Azucena Hernández  
Miércoles 10   → Carmen Hernández
Jueves 11      → Azucena Hernández
...
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/turnos-app.git

# Navegar al directorio
cd turnos-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

### 📱 Acceso desde Móvil

Para acceder desde tu celular en la misma red WiFi:
```bash
# Ejecutar con acceso de red
npm run dev -- --host

# Luego accede desde tu móvil a:
# http://[TU-IP-LOCAL]:5173/
# Ejemplo: http://192.168.100.106:5173/
```

## 📱 Navegación de la App

### 🏠 **Página Principal - Calendario**
- Calendario mensual interactivo
- Selección de fechas con un clic
- Indicadores visuales por trabajadora
- Botón "Hoy" para navegación rápida
- Información del día seleccionado

### 📊 **Estadísticas**
- Gráfico de barras: turnos por semana
- Gráfico circular: distribución mensual  
- Tarjetas de resumen con totales
- Análisis de próximos 30 días

### ⚙️ **Configuración**
- Personalizar nombres de trabajadoras
- Cambiar colores identificativos
- Modificar fecha de inicio del sistema
- Validación de formularios
- Guardado automático

## 🎨 Optimizaciones Móviles

### Safari/iOS:
- ✅ Meta tags específicos para PWA
- ✅ Prevención de zoom en inputs
- ✅ Área táctil mínima de 44px
- ✅ Sin highlights de selección
- ✅ Compatibilidad con notch (iPhone X+)

### Responsive Design:
- ✅ Breakpoints: 480px, 768px, 1200px
- ✅ Grid flexible con `auto-fit`
- ✅ Textos escalables con `clamp()`
- ✅ Navegación adaptativa
- ✅ Gráficos responsivos

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run dev -- --host # Servidor accesible desde red local
npm run build        # Construir para producción
npm run preview      # Vista previa de build
npm run lint         # Verificar código con ESLint
```

## 📁 Estructura del Proyecto

```
turnos-app/
├── src/
│   ├── components/
│   │   ├── CalendarioSimple.jsx    # Calendario principal
│   │   ├── ConfiguracionSimple.jsx # Configuración
│   │   ├── EstadisticasSimples.jsx # Gráficos y análisis
│   │   └── NavbarSimple.jsx        # Navegación
│   ├── store/
│   │   ├── index.js                # Configuración Redux
│   │   └── turnosSlice.js          # Lógica de turnos
│   ├── index.css                   # Estilos responsive
│   ├── main.jsx                    # Punto de entrada
│   └── App.jsx                     # Componente principal
├── public/                         # Archivos estáticos
├── package.json                    # Dependencias
└── README.md                       # Documentación
```

## 🎯 Casos de Uso

- **Hospitales y Clínicas** - Gestión de turnos médicos
- **Empresas de servicios** - Turnos de seguridad, atención al cliente
- **Servicios de Emergencia** - Rotación de personal
- **Cualquier trabajo** con sistema 12×36

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador** - Aplicación creada para gestionar turnos de Azucena y Carmen Hernández

---

**💡 Tip**: Para mejor experiencia móvil, agrega la aplicación a tu pantalla de inicio desde Safari (iOS) o Chrome (Android).