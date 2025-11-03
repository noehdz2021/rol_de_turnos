import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { cargarConfiguracion } from './store/turnosSlice';
import NavbarSimple from './components/NavbarSimple';
import CalendarioSimple from './components/CalendarioSimple';
import ConfiguracionSimple from './components/ConfiguracionSimple';
import EstadisticasSimples from './components/EstadisticasSimples';

// Componente interno para cargar datos al inicio
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar configuración al iniciar la app
    dispatch(cargarConfiguracion());
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <NavbarSimple />
      <main style={{ padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<CalendarioSimple />} />
          <Route path="/estadisticas" element={<EstadisticasSimples />} />
          <Route path="/configuracion" element={<ConfiguracionSimple />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;