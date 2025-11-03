import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Users } from 'lucide-react';
import { calcularPersonaTrabajando } from '../store/turnosSlice';

const EstadisticasSimples = () => {
  const { trabajadores, fechaInicioCarmen } = useSelector(state => state.turnos);

  // Calcular estadísticas para los próximos 30 días
  const calcularEstadisticas = () => {
    const hoy = new Date();
    const stats = {};

    // Inicializar stats con todos los trabajadores
    trabajadores.forEach(trabajador => {
      stats[trabajador.nombre] = 0;
    });

    for (let i = 0; i < 30; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(fecha.getDate() + i);
      const fechaString = fecha.toISOString().split('T')[0];
      const persona = calcularPersonaTrabajando(fechaString, fechaInicioCarmen, trabajadores);
      
      if (persona && stats.hasOwnProperty(persona)) {
        stats[persona]++;
      }
    }

    return stats;
  };

  // Calcular turnos por semana (próximas 4 semanas)
  const calcularTurnosPorSemana = () => {
    const hoy = new Date();
    const semanas = [];

    for (let semana = 0; semana < 4; semana++) {
      const inicioSemana = new Date(hoy);
      inicioSemana.setDate(hoy.getDate() + (semana * 7));
      
      const stats = {};
      trabajadores.forEach(trabajador => {
        stats[trabajador.nombre] = 0;
      });
      
      for (let dia = 0; dia < 7; dia++) {
        const fecha = new Date(inicioSemana);
        fecha.setDate(inicioSemana.getDate() + dia);
        const fechaString = fecha.toISOString().split('T')[0];
        const persona = calcularPersonaTrabajando(fechaString, fechaInicioCarmen, trabajadores);
        
        if (persona && stats.hasOwnProperty(persona)) {
          stats[persona]++;
        }
      }

      semanas.push({
        semana: `S${semana + 1}`,
        ...stats
      });
    }

    return semanas;
  };

  const estadisticas30Dias = calcularEstadisticas();
  const turnosPorSemana = calcularTurnosPorSemana();

  const dataPieChart = trabajadores.map(trabajador => ({
    name: trabajador.nombre,
    value: estadisticas30Dias[trabajador.nombre] || 0,
    color: trabajador.color
  }));

  // Obtener el primer trabajador para mostrar en tarjeta
  const primerTrabajador = trabajadores[0];
  const segundoTrabajador = trabajadores[1];

  return (
    <div className="container">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '0.5rem' 
        }}>
          <TrendingUp style={{ color: '#0ea5e9' }} size={28} />
          Estadísticas de Turnos
        </h2>
        <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
          Análisis de distribución de turnos
        </p>
      </div>

      {/* Tarjetas de resumen - Prioridad en móviles */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        {trabajadores.map((trabajador, index) => (
          <div key={trabajador.id} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', color: trabajador.color, marginBottom: '0.5rem' }}>
              {estadisticas30Dias[trabajador.nombre] || 0}
            </div>
            <div style={{ color: '#6b7280', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>Días - {trabajador.nombre}</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Próximos 30 días</div>
          </div>
        ))}

        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
            12×36
          </div>
          <div style={{ color: '#6b7280', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>Sistema de Turnos</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Rotación diaria</div>
        </div>
      </div>

      {/* Gráficos - Stack en móviles */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '1.5rem' 
      }}>
        {/* Gráfico de barras - Turnos por semana */}
        <div className="card">
          <h3 style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.125rem)', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Calendar size={20} />
            Turnos por Semana
          </h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnosPorSemana} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="semana" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '0.875rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                {trabajadores.map((trabajador) => (
                  <Bar 
                    key={trabajador.id}
                    dataKey={trabajador.nombre} 
                    fill={trabajador.color} 
                    name={trabajador.nombre}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico circular - Distribución próximos 30 días */}
        <div className="card">
          <h3 style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.125rem)', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Users size={20} />
            Distribución (30 días)
          </h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPieChart}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelStyle={{ fontSize: '12px', fontWeight: '500' }}
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '0.875rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="card">
        <h3 style={{ 
          fontSize: 'clamp(1rem, 3vw, 1.125rem)', 
          fontWeight: '600', 
          color: '#1f2937', 
          marginBottom: '0.75rem' 
        }}>
          Información del Sistema
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' 
        }}>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Fecha de inicio (Carmen):</span>
            <br />
            <span style={{ color: '#6b7280' }}>
              {new Date(fechaInicioCarmen + 'T00:00:00').toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#374151' }}>Patrón de turnos:</span>
            <br />
            <span style={{ color: '#6b7280' }}>Alternancia diaria automática</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasSimples;
