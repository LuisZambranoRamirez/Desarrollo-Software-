import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Especialidades', path: '/especialidades' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-[#2563EB] font-bold text-xl shrink-0">
            Clínica SaludTotal
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors duration-200 hover:text-[#2563EB] ${
                  pathname === link.path
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login-paciente"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-200"
            >
              Ingresar
            </Link>
            <Link
              to="/login-paciente"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all duration-200"
            >
              Reservar Cita
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  pathname === link.path
                    ? 'text-[#2563EB] font-semibold bg-[#EEF2FF]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-200" />
            <Link
              to="/login-paciente"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#2563EB] border-2 border-[#2563EB] rounded-xl text-center hover:bg-[#2563EB] hover:text-white transition-all duration-200"
            >
              Ingresar
            </Link>
            <Link
              to="/login-paciente"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium bg-[#2563EB] text-white rounded-xl text-center hover:bg-[#1D4ED8] transition-all duration-200"
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
