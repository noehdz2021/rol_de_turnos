import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, User, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { seleccionarFecha, calcularPersonaTrabajando, recalcularTurnos } from '../store/turnosSlice';

const CalendarioSimple = () => {
  const dispatch = useDispatch();
  const { fechaSeleccionada, personaTrabajando, trabajadores, fechaInicioCarmen } = useSelector(state => state.turnos);
  
  const [mesActual, setMesActual] = useState(new Date());
  const [diasDelMes, setDiasDelMes] = useState([]);

  // Recalcular turnos cuando cambie la fecha de inicio
  useEffect(() => {
    dispatch(recalcularTurnos());
  }, [fechaInicioCarmen, dispatch]);

  // Generar días del mes
  useEffect(() => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaSemanaInicio = primerDia.getDay();

    const dias = [];
    
    // Días del mes anterior
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
    
    // Días del mes siguiente
    const diasRestantes = 42 - dias.length;
    for (let dia = 1; dia <= diasRestantes; dia++) {
      const fecha = new Date(año, mes + 1, dia);
      dias.push({
        fecha,
        esDelMesActual: false,
        numero: dia
      });
    }
    
    setDiasDelMes(dias);
  }, [mesActual, fechaInicioCarmen]);

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar style={{ color: '#0ea5e9' }} size={32} />
            Calendario de Turnos
          </h1>
        </div>

        {/* Información del día seleccionado */}
        <div style={{ 
          background: 'linear-gradient(to right, #f0f9ff, #fdf4ff)', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1', minWidth: '200px' }}>
              <Clock style={{ color: '#0ea5e9' }} size={24} />
              <div>
                <h3 style={{ fontWeight: '600', color: '#1f2937', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  {new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Fecha seleccionada</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User 
                size={24}
                style={{ color: personaTrabajando ? obtenerColorTrabajador(personaTrabajando) : '#6b7280' }}
              />
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontWeight: '600', color: '#1f2937', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  {personaTrabajando || 'Sin asignar'}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>Trabajador de turno</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación del calendario */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <button
            onClick={irMesAnterior}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              color: '#6b7280',
              background: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              minWidth: '80px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0ea5e9';
              e.target.style.backgroundColor = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6b7280';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <ChevronLeft size={16} />
            <span style={{ display: 'none' }}>Anterior</span>
          </button>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: 0
            }}>
              {meses[mesActual.getMonth()]} {mesActual.getFullYear()}
            </h2>
            
            <button
              onClick={() => {
                const hoy = new Date();
                setMesActual(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
                const fechaHoy = hoy.toISOString().split('T')[0];
                dispatch(seleccionarFecha(fechaHoy));
              }}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                padding: '0.4rem 0.6rem',
                minWidth: '70px'
              }}
            >
              <Calendar size={14} />
              Hoy
            </button>
          </div>
          
          <button
            onClick={irMesSiguiente}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              color: '#6b7280',
              background: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              minWidth: '80px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0ea5e9';
              e.target.style.backgroundColor = '#f0f9ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6b7280';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ display: 'none' }}>Siguiente</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Calendario */}
        <div className="calendar-grid">
          {/* Encabezados de días de la semana */}
          {diasSemana.map(dia => (
            <div key={dia} style={{ 
              padding: '0.75rem', 
              textAlign: 'center', 
              fontWeight: '500', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              {dia}
            </div>
          ))}
          
          {/* Días del calendario */}
          {diasDelMes.map((diaInfo, index) => {
            const { fecha, esDelMesActual, numero } = diaInfo;
            const fechaString = fecha.toISOString().split('T')[0];
            const personaDelDia = calcularPersonaTrabajando(fechaString, fechaInicioCarmen);
            const colorTrabajador = personaDelDia ? obtenerColorTrabajador(personaDelDia) : null;
            
            let clasesDia = 'calendar-day';
            if (esFechaSeleccionada(fecha)) clasesDia += ' selected';
            if (esHoy(fecha)) clasesDia += ' today';
            
            return (
              <button
                key={index}
                onClick={() => manejarSeleccionDia(fecha)}
                className={clasesDia}
                style={{
                  opacity: esDelMesActual ? 1 : 0.5,
                  backgroundColor: esFechaSeleccionada(fecha) 
                    ? '#dbeafe' 
                    : colorTrabajador 
                      ? `${colorTrabajador}20` 
                      : 'white'
                }}
              >
                <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>{numero}</span>
                {personaDelDia && esDelMesActual && (
                  <div 
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: colorTrabajador,
                      marginTop: '4px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div style={{ 
          marginTop: '1.5rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          justifyContent: 'center' 
        }}>
          {trabajadores.map(trabajador => (
            <div key={trabajador.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: trabajador.color
                }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                {trabajador.nombre}
              </span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '2px solid #f59e0b',
              backgroundColor: '#fef3c7'
            }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Hoy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioSimple;
