import { createSlice } from '@reduxjs/toolkit';

// Función para calcular qué persona trabaja en una fecha específica
const calcularPersonaTrabajando = (fecha, fechaInicioCarmen = '2024-09-09') => {
  const fechaInicio = new Date(fechaInicioCarmen + 'T00:00:00');
  const fechaConsulta = new Date(fecha + 'T00:00:00');
  
  // Calcular la diferencia en días
  const diferenciaTiempo = fechaConsulta.getTime() - fechaInicio.getTime();
  const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
  
  // Si la fecha es anterior al inicio, no hay turno asignado
  if (diferenciaDias < 0) {
    return null;
  }
  
  // Cada día alterna la persona (sistema 12×36)
  // Carmen empieza, entonces:
  // Día 0: Carmen
  // Día 1: Azucena  
  // Día 2: Carmen
  // Día 3: Azucena
  // etc.
  return diferenciaDias % 2 === 0 ? 'Carmen Hernández' : 'Azucena Hernández';
};

// Cargar datos desde localStorage
const cargarTurnosDesdeStorage = () => {
  try {
    const turnosGuardados = localStorage.getItem('turnos-app-data');
    if (turnosGuardados) {
      return JSON.parse(turnosGuardados);
    }
  } catch (error) {
    console.error('Error al cargar datos desde localStorage:', error);
  }
  
  return {
    fechaInicioCarmen: '2024-09-09',
    trabajadores: [
      { id: 1, nombre: 'Carmen Hernández', color: '#0ea5e9' },
      { id: 2, nombre: 'Azucena Hernández', color: '#d946ef' }
    ]
  };
};

const initialState = {
  ...cargarTurnosDesdeStorage(),
  fechaSeleccionada: new Date().toISOString().split('T')[0],
  personaTrabajando: null,
};

// Calcular persona trabajando para la fecha inicial
initialState.personaTrabajando = calcularPersonaTrabajando(initialState.fechaSeleccionada, initialState.fechaInicioCarmen);

const turnosSlice = createSlice({
  name: 'turnos',
  initialState,
  reducers: {
    seleccionarFecha: (state, action) => {
      state.fechaSeleccionada = action.payload;
      state.personaTrabajando = calcularPersonaTrabajando(action.payload, state.fechaInicioCarmen);
    },
    actualizarFechaInicio: (state, action) => {
      state.fechaInicioCarmen = action.payload;
      state.personaTrabajando = calcularPersonaTrabajando(state.fechaSeleccionada, state.fechaInicioCarmen);
      
      // Guardar en localStorage
      const datosAGuardar = {
        fechaInicioCarmen: state.fechaInicioCarmen,
        trabajadores: state.trabajadores
      };
      localStorage.setItem('turnos-app-data', JSON.stringify(datosAGuardar));
    },
    recalcularTurnos: (state) => {
      // Forzar recálculo del turno actual
      state.personaTrabajando = calcularPersonaTrabajando(state.fechaSeleccionada, state.fechaInicioCarmen);
    },
    actualizarTrabajador: (state, action) => {
      const { id, datos } = action.payload;
      const index = state.trabajadores.findIndex(t => t.id === id);
      if (index !== -1) {
        state.trabajadores[index] = { ...state.trabajadores[index], ...datos };
        
        // Guardar en localStorage
        const datosAGuardar = {
          fechaInicioCarmen: state.fechaInicioCarmen,
          trabajadores: state.trabajadores
        };
        localStorage.setItem('turnos-app-data', JSON.stringify(datosAGuardar));
      }
    }
  },
});

export const { seleccionarFecha, actualizarFechaInicio, actualizarTrabajador, recalcularTurnos } = turnosSlice.actions;
export { calcularPersonaTrabajando };
export default turnosSlice.reducer;
