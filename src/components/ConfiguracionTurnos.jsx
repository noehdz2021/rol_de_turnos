import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Settings, Save, User, Calendar } from 'lucide-react';
import { actualizarFechaInicio, actualizarTrabajador } from '../store/turnosSlice';

const ConfiguracionTurnos = () => {
  const dispatch = useDispatch();
  const { fechaInicioCarmen, trabajadores } = useSelector(state => state.turnos);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fechaInicio: fechaInicioCarmen,
      nombreCarmen: trabajadores[0]?.nombre || 'Carmen Hernández',
      nombreAzucena: trabajadores[1]?.nombre || 'Azucena Hernández',
      colorCarmen: trabajadores[0]?.color || '#0ea5e9',
      colorAzucena: trabajadores[1]?.color || '#d946ef'
    }
  });

  const onSubmit = (data) => {
    // Actualizar fecha de inicio
    dispatch(actualizarFechaInicio(data.fechaInicio));
    
    // Actualizar trabajadores
    dispatch(actualizarTrabajador({
      id: 1,
      datos: {
        nombre: data.nombreCarmen,
        color: data.colorCarmen
      }
    }));
    
    dispatch(actualizarTrabajador({
      id: 2,
      datos: {
        nombre: data.nombreAzucena,
        color: data.colorAzucena
      }
    }));

    // Mostrar mensaje de éxito
    alert('Configuración guardada exitosamente');
  };

  const resetearFormulario = () => {
    reset({
      fechaInicio: fechaInicioCarmen,
      nombreCarmen: trabajadores[0]?.nombre || 'Carmen Hernández',
      nombreAzucena: trabajadores[1]?.nombre || 'Azucena Hernández',
      colorCarmen: trabajadores[0]?.color || '#0ea5e9',
      colorAzucena: trabajadores[1]?.color || '#d946ef'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-primary-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Configuración de Turnos</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Fecha de inicio */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} />
              Fecha de inicio (Carmen empieza)
            </label>
            <input
              type="date"
              {...register('fechaInicio', { 
                required: 'La fecha de inicio es requerida' 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.fechaInicio && (
              <p className="text-red-500 text-sm mt-1">{errors.fechaInicio.message}</p>
            )}
          </div>

          {/* Configuración de Carmen */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
              <User size={18} />
              Primera Trabajadora (inicia turnos)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  {...register('nombreCarmen', { 
                    required: 'El nombre es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Carmen Hernández"
                />
                {errors.nombreCarmen && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombreCarmen.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color identificativo
                </label>
                <input
                  type="color"
                  {...register('colorCarmen')}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Configuración de Azucena */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
              <User size={18} />
              Segunda Trabajadora (turno alternado)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  {...register('nombreAzucena', { 
                    required: 'El nombre es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Azucena Hernández"
                />
                {errors.nombreAzucena && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombreAzucena.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color identificativo
                </label>
                <input
                  type="color"
                  {...register('colorAzucena')}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="btn-primary flex items-center gap-2 flex-1"
            >
              <Save size={18} />
              Guardar Configuración
            </button>
            
            <button
              type="button"
              onClick={resetearFormulario}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Restablecer
            </button>
          </div>
        </form>

        {/* Información del sistema de turnos */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Sistema de Turnos 24×36</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Cada trabajadora trabaja un día completo (24 horas)</li>
            <li>• Luego descansa el día siguiente (36 horas de descanso)</li>
            <li>• Los turnos se alternan automáticamente</li>
            <li>• La primera trabajadora inicia según la fecha configurada</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionTurnos;
