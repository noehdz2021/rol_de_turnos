import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NavbarSimple from './components/NavbarSimple';
import CalendarioSimple from './components/CalendarioSimple';
import ConfiguracionSimple from './components/ConfiguracionSimple';
import EstadisticasSimples from './components/EstadisticasSimples';

function App() {
  return (
    <Provider store={store}>
      <Router>
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
      </Router>
    </Provider>
  );
}

export default App;