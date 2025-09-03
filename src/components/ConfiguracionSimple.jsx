import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Settings, Save, User, Calendar, Download, Upload, RotateCcw } from 'lucide-react';
import { actualizarFechaInicio, actualizarTrabajador, exportarConfiguracion, importarConfiguracion, restablecerConfiguracion } from '../store/turnosSlice';

const ConfiguracionSimple = () => {
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
    dispatch(actualizarFechaInicio(data.fechaInicio));
    
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

  const exportarDatos = () => {
    const configuracion = {
      fechaInicioCarmen,
      trabajadores,
      fechaExportacion: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(configuracion, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `turnos-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Configuración exportada exitosamente');
  };

  const importarDatos = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const configuracion = JSON.parse(e.target.result);
        
        if (configuracion.fechaInicioCarmen && configuracion.trabajadores) {
          dispatch(importarConfiguracion(configuracion));
          
          // Actualizar formulario
          reset({
            fechaInicio: configuracion.fechaInicioCarmen,
            nombreCarmen: configuracion.trabajadores[0]?.nombre || 'Carmen Hernández',
            nombreAzucena: configuracion.trabajadores[1]?.nombre || 'Azucena Hernández',
            colorCarmen: configuracion.trabajadores[0]?.color || '#0ea5e9',
            colorAzucena: configuracion.trabajadores[1]?.color || '#d946ef'
          });
          
          alert('Configuración importada exitosamente');
        } else {
          alert('Archivo de configuración inválido');
        }
      } catch (error) {
        alert('Error al leer el archivo de configuración');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Limpiar input
  };

  const restablecerTodo = () => {
    if (confirm('¿Estás seguro de que quieres restablecer toda la configuración a los valores por defecto?')) {
      dispatch(restablecerConfiguracion());
      
      // Actualizar formulario con valores por defecto
      reset({
        fechaInicio: '2025-09-09',
        nombreCarmen: 'Carmen Hernández',
        nombreAzucena: 'Azucena Hernández',
        colorCarmen: '#0ea5e9',
        colorAzucena: '#d946ef'
      });
      
      alert('Configuración restablecida a valores por defecto');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Settings style={{ color: '#0ea5e9' }} size={28} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
            Configuración de Turnos
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Fecha de inicio */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} />
              Fecha de inicio (Carmen empieza)
            </label>
            <input
              type="date"
              {...register('fechaInicio', { 
                required: 'La fecha de inicio es requerida' 
              })}
              className="form-input"
            />
            {errors.fechaInicio && (
              <p className="error-message">{errors.fechaInicio.message}</p>
            )}
          </div>

          {/* Configuración de Carmen */}
          <div style={{ backgroundColor: '#dbeafe', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '0.75rem' 
            }}>
              <User size={18} />
              Primera Trabajadora (inicia turnos)
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div className="form-group">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  {...register('nombreCarmen', { 
                    required: 'El nombre es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="form-input"
                  placeholder="Carmen Hernández"
                />
                {errors.nombreCarmen && (
                  <p className="error-message">{errors.nombreCarmen.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Color identificativo</label>
                <input
                  type="color"
                  {...register('colorCarmen')}
                  style={{ width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Configuración de Azucena */}
          <div style={{ backgroundColor: '#fdf4ff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '0.75rem' 
            }}>
              <User size={18} />
              Segunda Trabajadora (turno alternado)
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div className="form-group">
                <label className="form-label">Nombre completo</label>
                <input
                  type="text"
                  {...register('nombreAzucena', { 
                    required: 'El nombre es requerido',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="form-input"
                  placeholder="Azucena Hernández"
                />
                {errors.nombreAzucena && (
                  <p className="error-message">{errors.nombreAzucena.message}</p>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Color identificativo</label>
                <input
                  type="color"
                  {...register('colorAzucena')}
                  style={{ width: '100%', height: '40px', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}
            >
              <Save size={18} />
              Guardar Configuración
            </button>
            
            <button
              type="button"
              onClick={resetearFormulario}
              style={{
                padding: '0.5rem 1.5rem',
                color: '#6b7280',
                background: 'transparent',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#1f2937';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Restablecer
            </button>
          </div>
        </form>

        {/* Gestión de datos */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '8px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '1rem' }}>
            Gestión de Datos
          </h4>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '0.75rem' 
          }}>
            {/* Exportar configuración */}
            <button
              type="button"
              onClick={exportarDatos}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              <Download size={16} />
              Exportar Backup
            </button>

            {/* Importar configuración */}
            <label style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <Upload size={16} />
              Importar Backup
              <input
                type="file"
                accept=".json"
                onChange={importarDatos}
                style={{ display: 'none' }}
              />
            </label>

            {/* Restablecer todo */}
            <button
              type="button"
              onClick={restablecerTodo}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              <RotateCcw size={16} />
              Restablecer Todo
            </button>
          </div>
          
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.75rem',
            fontStyle: 'italic'
          }}>
            💾 Los datos se guardan automáticamente en tu navegador. Usa backup para mayor seguridad.
          </p>
        </div>

        {/* Información del sistema */}
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '8px' 
        }}>
          <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>
            Sistema de Turnos 12×36
          </h4>
          <ul style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
            <li>• Cada trabajadora trabaja un turno de 12 horas</li>
            <li>• Luego descansa 36 horas (día y medio de descanso)</li>
            <li>• Los turnos se alternan automáticamente</li>
            <li>• La primera trabajadora inicia según la fecha configurada</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionSimple;
