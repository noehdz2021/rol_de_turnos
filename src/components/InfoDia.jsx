import { useSelector } from 'react-redux';
import { User, Clock, Calendar, ArrowRight } from 'lucide-react';
import { calcularPersonaTrabajando } from '../store/turnosSlice';

const InfoDia = () => {
  const { fechaSeleccionada, trabajadores } = useSelector(state => state.turnos);

  // Calcular información para varios días
  const obtenerInfoSemana = () => {
    const fechaBase = new Date(fechaSeleccionada + 'T00:00:00');
    const diasSemana = [];

    // Obtener los 7 días de la semana (empezando por lunes)
    const diaSemana = fechaBase.getDay();
    const inicioSemana = new Date(fechaBase);
    inicioSemana.setDate(fechaBase.getDate() - diaSemana + 1);

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + i);
      const fechaString = fecha.toISOString().split('T')[0];
      const persona = calcularPersonaTrabajando(fechaString);
      
      diasSemana.push({
        fecha,
        fechaString,
        persona,
        esSeleccionado: fechaString === fechaSeleccionada,
        esHoy: fecha.toDateString() === new Date().toDateString()
      });
    }

    return diasSemana;
  };

  const infoSemana = obtenerInfoSemana();
  const personaActual = calcularPersonaTrabajando(fechaSeleccionada);

  const obtenerColorTrabajador = (nombreTrabajador) => {
    const trabajador = trabajadores.find(t => t.nombre === nombreTrabajador);
    return trabajador ? trabajador.color : '#6b7280';
  };

  const diasSemanaNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card mb-6">
        {/* Información del día seleccionado */}
        <div className="text-center mb-6">
          <div 
            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white font-semibold text-lg"
            style={{ backgroundColor: personaActual ? obtenerColorTrabajador(personaActual) : '#6b7280' }}
          >
            <User size={24} />
            <span>
              {personaActual || 'Sin asignar'} - {' '}
              {new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Vista de la semana */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Vista Semanal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {infoSemana.map((dia, index) => (
              <div
                key={dia.fechaString}
                className={`
                  p-3 rounded-lg border transition-all duration-200
                  ${dia.esSeleccionado 
                    ? 'ring-2 ring-primary-500 bg-primary-100 border-primary-300' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  ${dia.esHoy 
                    ? 'bg-yellow-100 border-yellow-400' 
                    : ''
                  }
                `}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {diasSemanaNames[index]}
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-2">
                    {dia.fecha.getDate()}
                  </div>
                  <div 
                    className="text-xs font-medium text-white px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: dia.persona ? obtenerColorTrabajador(dia.persona) : '#6b7280' 
                    }}
                  >
                    {dia.persona ? dia.persona.split(' ')[0] : 'N/A'}
                  </div>
                  {dia.esHoy && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">
                      Hoy
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos turnos */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ArrowRight size={20} />
            Próximos Turnos
          </h3>
          
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => {
              const fecha = new Date(fechaSeleccionada + 'T00:00:00');
              fecha.setDate(fecha.getDate() + i + 1);
              const fechaString = fecha.toISOString().split('T')[0];
              const persona = calcularPersonaTrabajando(fechaString);
              
              return (
                <div
                  key={fechaString}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: persona ? obtenerColorTrabajador(persona) : '#6b7280' }}
                    />
                    <span className="font-medium text-gray-800">
                      {fecha.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {persona || 'Sin asignar'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDia;
