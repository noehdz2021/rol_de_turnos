import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Users } from 'lucide-react';
import { calcularPersonaTrabajando } from '../store/turnosSlice';

const EstadisticasTurnos = () => {
  const { trabajadores, fechaInicioCarmen } = useSelector(state => state.turnos);

  // Calcular estadísticas para los próximos 30 días
  const calcularEstadisticas = () => {
    const hoy = new Date();
    const stats = {
      Carmen: 0,
      Azucena: 0
    };

    for (let i = 0; i < 30; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(fecha.getDate() + i);
      const fechaString = fecha.toISOString().split('T')[0];
      const persona = calcularPersonaTrabajando(fechaString, fechaInicioCarmen);
      
      if (persona === 'Carmen Hernández') {
        stats.Carmen++;
      } else if (persona === 'Azucena Hernández') {
        stats.Azucena++;
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
      
      const stats = { Carmen: 0, Azucena: 0 };
      
      for (let dia = 0; dia < 7; dia++) {
        const fecha = new Date(inicioSemana);
        fecha.setDate(inicioSemana.getDate() + dia);
        const fechaString = fecha.toISOString().split('T')[0];
        const persona = calcularPersonaTrabajando(fechaString, fechaInicioCarmen);
        
        if (persona === 'Carmen Hernández') {
          stats.Carmen++;
        } else if (persona === 'Azucena Hernández') {
          stats.Azucena++;
        }
      }

      semanas.push({
        semana: `Semana ${semana + 1}`,
        Carmen: stats.Carmen,
        Azucena: stats.Azucena
      });
    }

    return semanas;
  };

  const estadisticas30Dias = calcularEstadisticas();
  const turnosPorSemana = calcularTurnosPorSemana();

  const dataPieChart = [
    { name: 'Carmen', value: estadisticas30Dias.Carmen, color: trabajadores[0]?.color || '#0ea5e9' },
    { name: 'Azucena', value: estadisticas30Dias.Azucena, color: trabajadores[1]?.color || '#d946ef' }
  ];

  return (
    <div className="container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <TrendingUp className="text-primary-600" size={28} />
          Estadísticas de Turnos
        </h2>
        <p className="text-gray-600">Análisis de distribución de turnos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de barras - Turnos por semana */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Turnos por Semana (Próximas 4 semanas)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnosPorSemana}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="Carmen" 
                  fill={trabajadores[0]?.color || '#0ea5e9'} 
                  name="Carmen"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="Azucena" 
                  fill={trabajadores[1]?.color || '#d946ef'} 
                  name="Azucena"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico circular - Distribución próximos 30 días */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={20} />
            Distribución (Próximos 30 días)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPieChart}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} días`}
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {estadisticas30Dias.Carmen}
          </div>
          <div className="text-gray-600">Días - Carmen</div>
          <div className="text-sm text-gray-500 mt-1">Próximos 30 días</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl font-bold text-secondary-600 mb-2">
            {estadisticas30Dias.Azucena}
          </div>
          <div className="text-gray-600">Días - Azucena</div>
          <div className="text-sm text-gray-500 mt-1">Próximos 30 días</div>
        </div>

        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            24×36
          </div>
          <div className="text-gray-600">Sistema de Turnos</div>
          <div className="text-sm text-gray-500 mt-1">Rotación diaria</div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="card mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Información del Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Fecha de inicio (Carmen):</span>
            <span className="ml-2 text-gray-600">
              {new Date(fechaInicioCarmen + 'T00:00:00').toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Patrón de turnos:</span>
            <span className="ml-2 text-gray-600">Alternancia diaria automática</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasTurnos;
