import { Link, useLocation } from 'react-router-dom';
import { Calendar, Settings, Users, TrendingUp } from 'lucide-react';

const NavbarSimple = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Calendario',
      icon: Calendar
    },
    {
      path: '/estadisticas',
      label: 'Estadísticas',
      icon: TrendingUp
    },
    {
      path: '/configuracion',
      label: 'Configuración',
      icon: Settings
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            padding: '0.5rem', 
            backgroundColor: '#0ea5e9', 
            borderRadius: '8px' 
          }}>
            <Users style={{ color: 'white' }} size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
              TurnosApp
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Sistema 24×36
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div className="nav-links">
          {navItems.map(({ path, label, icon: Icon }) => (
                          <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSimple;
