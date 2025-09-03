import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { seleccionarFecha, calcularPersonaTrabajando } from '../store/turnosSlice';

const CalendarioTurnos = () => {
  const dispatch = useDispatch();
  const { fechaSeleccionada, personaTrabajando, trabajadores } = useSelector(state => state.turnos);
  
  const [mesActual, setMesActual] = useState(new Date());
  const [diasDelMes, setDiasDelMes] = useState([]);

  // Generar días del mes
  useEffect(() => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaSemanaInicio = primerDia.getDay();

    const dias = [];
    
    // Días del mes anterior (para completar la primera semana)
    for (let i = diaSemanaInicio - 1; i >= 0; i--) {
      const dia = new Date(año, mes, -i);
      dias.push({
        fecha: dia,
        esDelMesActual: false,
        numero: dia.getDate()
      });
    }
    
    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(año, mes, dia);
      dias.push({
        fecha,
        esDelMesActual: true,
        numero: dia
      });
    }
    
    // Días del mes siguiente (para completar la última semana)
    const diasRestantes = 42 - dias.length; // 6 semanas * 7 días
    for (let dia = 1; dia <= diasRestantes; dia++) {
      const fecha = new Date(año, mes + 1, dia);
      dias.push({
        fecha,
        esDelMesActual: false,
        numero: dia
      });
    }
    
    setDiasDelMes(dias);
  }, [mesActual]);

  const manejarSeleccionDia = (fecha) => {
    const fechaString = fecha.toISOString().split('T')[0];
    dispatch(seleccionarFecha(fechaString));
  };

  const irMesAnterior = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  };

  const irMesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));
  };

  const obtenerColorTrabajador = (nombreTrabajador) => {
    const trabajador = trabajadores.find(t => t.nombre === nombreTrabajador);
    return trabajador ? trabajador.color : '#6b7280';
  };

  const esFechaSeleccionada = (fecha) => {
    return fecha.toISOString().split('T')[0] === fechaSeleccionada;
  };

  const esHoy = (fecha) => {
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
  };

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="container">
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Calendar className="text-primary-600" size={32} />
            Calendario de Turnos
          </h1>
        </div>

        {/* Información del día seleccionado */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="text-primary-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <p className="text-gray-600 text-sm">Fecha seleccionada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User 
                className="text-gray-600" 
                size={24}
                style={{ color: personaTrabajando ? obtenerColorTrabajador(personaTrabajando) : '#6b7280' }}
              />
              <div className="text-right">
                <h3 className="font-semibold text-gray-800">
                  {personaTrabajando || 'Sin asignar'}
                </h3>
                <p className="text-gray-600 text-sm">Trabajador de turno</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación del calendario */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={irMesAnterior}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {meses[mesActual.getMonth()]} {mesActual.getFullYear()}
          </h2>
          
          <button
            onClick={irMesSiguiente}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendario */}
        <div className="grid grid-cols-7 gap-1">
          {/* Encabezados de días de la semana */}
          {diasSemana.map(dia => (
            <div key={dia} className="p-3 text-center font-medium text-gray-500 text-sm">
              {dia}
            </div>
          ))}
          
          {/* Días del calendario */}
          {diasDelMes.map((diaInfo, index) => {
            const { fecha, esDelMesActual, numero } = diaInfo;
            const fechaString = fecha.toISOString().split('T')[0];
            const personaDelDia = calcularPersonaTrabajando(fechaString);
            const colorTrabajador = personaDelDia ? obtenerColorTrabajador(personaDelDia) : null;
            
            return (
              <button
                key={index}
                onClick={() => manejarSeleccionDia(fecha)}
                className={`
                  p-3 text-center rounded-lg transition-all duration-200 hover:scale-105 min-h-[60px] flex flex-col items-center justify-center
                  ${esDelMesActual 
                    ? 'text-gray-800 hover:bg-gray-100' 
                    : 'text-gray-400 hover:bg-gray-50'
                  }
                  ${esFechaSeleccionada(fecha) 
                    ? 'ring-2 ring-primary-500 bg-primary-100 font-bold' 
                    : ''
                  }
                  ${esHoy(fecha) 
                    ? 'bg-yellow-100 border-2 border-yellow-400' 
                    : ''
                  }
                `}
                style={{
                  backgroundColor: esFechaSeleccionada(fecha) 
                    ? undefined 
                    : colorTrabajador 
                      ? `${colorTrabajador}20` 
                      : undefined
                }}
              >
                <span className="text-lg font-medium">{numero}</span>
                {personaDelDia && esDelMesActual && (
                  <div 
                    className="w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: colorTrabajador }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {trabajadores.map(trabajador => (
            <div key={trabajador.id} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: trabajador.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {trabajador.nombre}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-100" />
            <span className="text-sm font-medium text-gray-700">Hoy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioTurnos;
