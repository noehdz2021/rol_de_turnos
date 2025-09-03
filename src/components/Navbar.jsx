import { Link, useLocation } from 'react-router-dom';
import { Calendar, Settings, Users, TrendingUp } from 'lucide-react';

const Navbar = () => {
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
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">TurnosApp</h1>
              <p className="text-xs text-gray-500">Sistema 24×36</p>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive(path)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
