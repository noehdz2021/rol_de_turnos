# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a TurnosApp! Aquí tienes todo lo que necesitas saber.

## 🚀 Configuración de Desarrollo

### Prerrequisitos
- Node.js 18+
- Git
- Editor de código (VS Code recomendado)

### Configuración Local
```bash
# 1. Fork y clonar el repositorio
git clone https://github.com/tu-usuario/turnos-app.git
cd turnos-app

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Ejecutar con acceso de red (para móviles)
npm run dev -- --host
```

## 📋 Proceso de Contribución

### 1. Crear Issue
- Describe el problema o mejora
- Usa las etiquetas apropiadas
- Proporciona contexto suficiente

### 2. Desarrollo
```bash
# Crear rama desde main
git checkout main
git pull origin main
git checkout -b feature/nueva-funcionalidad

# Hacer cambios
# Probar localmente
npm run dev
npm run lint

# Commit con mensaje descriptivo
git commit -m "✨ feat: agregar nueva funcionalidad"
```

### 3. Pull Request
- Título claro y descriptivo
- Descripción detallada de cambios
- Screenshots para cambios visuales
- Mencionar issues relacionados

## 🎯 Tipos de Contribuciones

### 🐛 Bug Fixes
- Reportar problemas con pasos para reproducir
- Incluir información del navegador/dispositivo
- Proponer solución si es posible

### ✨ Nuevas Características
- Discutir primero en un issue
- Mantener compatibilidad existente
- Agregar documentación

### 📚 Documentación
- Mejorar README
- Agregar comentarios al código
- Crear ejemplos de uso

### 🎨 Mejoras de UI/UX
- Screenshots antes/después
- Considerar accesibilidad
- Probar en múltiples dispositivos

## 🧪 Testing

### Pruebas Manuales
- [ ] Funciona en Chrome desktop
- [ ] Funciona en Safari desktop
- [ ] Funciona en Safari iOS
- [ ] Funciona en Chrome Android
- [ ] Responsive en todas las pantallas
- [ ] Formularios validan correctamente
- [ ] LocalStorage persiste datos

### Checklist Pre-PR
- [ ] Código lints sin errores (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Probado en móvil
- [ ] Documentación actualizada

## 📝 Estilo de Código

### Convenciones
- Usar nombres descriptivos en español para variables de negocio
- Componentes en PascalCase
- Archivos en camelCase
- CSS con BEM o utility classes

### Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: agregar pruebas
chore: tareas de mantenimiento
```

## 🎨 Diseño y UX

### Principios
- **Mobile First**: Diseñar primero para móvil
- **Accesibilidad**: Área táctil mínima 44px
- **Consistencia**: Usar colores y espaciado del sistema
- **Simplicidad**: Interfaz clara e intuitiva

### Colores del Sistema
- Primario: `#0ea5e9` (azul)
- Secundario: `#d946ef` (morado)
- Carmen: `#0ea5e9` (personalizable)
- Azucena: `#d946ef` (personalizable)

## 📱 Testing Móvil

### Dispositivos Objetivo
- iPhone (Safari)
- iPad (Safari)
- Android (Chrome)
- Tablets Android

### Características a Probar
- Touch interactions
- Scroll behavior
- Form inputs
- Navigation
- Charts responsiveness

## ❓ ¿Necesitas Ayuda?

- 📧 Abre un issue con la etiqueta `question`
- 💬 Describe tu problema con detalle
- 🖼️ Incluye screenshots si es relevante

¡Gracias por contribuir a TurnosApp! 🎉
