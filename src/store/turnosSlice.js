import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { configuracionAPI, usuariosAPI } from '../services/api';

// Función para calcular qué persona trabaja en una fecha específica
export const calcularPersonaTrabajando = (fecha, fechaInicioCarmen, trabajadores) => {
  if (!fechaInicioCarmen || !trabajadores || trabajadores.length === 0) {
    return null;
  }

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
  // El primer trabajador (orden 1) inicia, luego el segundo (orden 2), y así sucesivamente
  const trabajadoresOrdenados = [...trabajadores].sort((a, b) => a.orden - b.orden);
  const indice = diferenciaDias % trabajadoresOrdenados.length;
  
  return trabajadoresOrdenados[indice]?.nombre || null;
};

// Async thunks para cargar datos desde la API
export const cargarConfiguracion = createAsyncThunk(
  'turnos/cargarConfiguracion',
  async () => {
    const data = await configuracionAPI.get();
    return data;
  }
);

export const actualizarFechaInicioAPI = createAsyncThunk(
  'turnos/actualizarFechaInicioAPI',
  async (fechaInicio) => {
    const data = await configuracionAPI.updateFechaInicio(fechaInicio);
    return data;
  }
);

export const actualizarUsuarioAPI = createAsyncThunk(
  'turnos/actualizarUsuarioAPI',
  async ({ id, datos }) => {
    const data = await usuariosAPI.update(id, datos);
    return { id, datos: data };
  }
);

const initialState = {
  fechaInicioCarmen: null,
  trabajadores: [],
  fechaSeleccionada: new Date().toISOString().split('T')[0],
  personaTrabajando: null,
  loading: false,
  error: null,
};

const turnosSlice = createSlice({
  name: 'turnos',
  initialState,
  reducers: {
    seleccionarFecha: (state, action) => {
      state.fechaSeleccionada = action.payload;
      state.personaTrabajando = calcularPersonaTrabajando(
        action.payload, 
        state.fechaInicioCarmen, 
        state.trabajadores
      );
    },
    recalcularTurnos: (state) => {
      // Forzar recálculo del turno actual
      state.personaTrabajando = calcularPersonaTrabajando(
        state.fechaSeleccionada, 
        state.fechaInicioCarmen, 
        state.trabajadores
      );
    },
  },
  extraReducers: (builder) => {
    // Cargar configuración
    builder
      .addCase(cargarConfiguracion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cargarConfiguracion.fulfilled, (state, action) => {
        state.loading = false;
        state.fechaInicioCarmen = action.payload.fechaInicio;
        state.trabajadores = action.payload.usuarios;
        state.personaTrabajando = calcularPersonaTrabajando(
          state.fechaSeleccionada,
          state.fechaInicioCarmen,
          state.trabajadores
        );
      })
      .addCase(cargarConfiguracion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Actualizar fecha de inicio
    builder
      .addCase(actualizarFechaInicioAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarFechaInicioAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.fechaInicioCarmen = action.payload.fechaInicio;
        state.personaTrabajando = calcularPersonaTrabajando(
          state.fechaSeleccionada,
          state.fechaInicioCarmen,
          state.trabajadores
        );
      })
      .addCase(actualizarFechaInicioAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Actualizar usuario
    builder
      .addCase(actualizarUsuarioAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actualizarUsuarioAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.trabajadores.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.trabajadores[index] = { ...state.trabajadores[index], ...action.payload.datos };
        }
        state.personaTrabajando = calcularPersonaTrabajando(
          state.fechaSeleccionada,
          state.fechaInicioCarmen,
          state.trabajadores
        );
      })
      .addCase(actualizarUsuarioAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { seleccionarFecha, recalcularTurnos } = turnosSlice.actions;
export default turnosSlice.reducer;
