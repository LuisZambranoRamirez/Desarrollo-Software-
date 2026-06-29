import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const SocialIcon = ({ type }) => {
  const paths = {
    facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    twitter: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
    instagram: 'M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm-5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm5-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
    linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    youtube: 'M23.5 6.5a3.5 3.5 0 0 0-3.5-3.5H4a3.5 3.5 0 0 0-3.5 3.5v11a3.5 3.5 0 0 0 3.5 3.5h16a3.5 3.5 0 0 0 3.5-3.5v-11zM10 9.5l6 3.5-6 3.5v-7z',
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d={paths[type]} />
    </svg>
  );
};

const quickLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Especialidades', path: '/especialidades' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
  { label: 'Reservar Cita', path: '/login-paciente' },
];

const specialties = [
  'Cardiología',
  'Pediatría',
  'Traumatología',
  'Dermatología',
  'Neurología',
  'Ginecología',
];

const contactInfo = [
  { icon: MapPin, text: 'Av. Salud 123, Ciudad' },
  { icon: Phone, text: '+51 999 888 777' },
  { icon: Mail, text: 'contacto@clinicalsaludtotal.pe' },
  { icon: Clock, text: 'Lun - Vie: 8:00 - 20:00' },
];

const socialLinks = [
  { icon: 'facebook', href: '#', label: 'Facebook' },
  { icon: 'twitter', href: '#', label: 'Twitter' },
  { icon: 'instagram', href: '#', label: 'Instagram' },
  { icon: 'linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'youtube', href: '#', label: 'YouTube' },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="text-[#2563EB] font-bold text-xl">
              Clínica SaludTotal
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Brindamos atención médica de calidad con profesionales comprometidos
              en el cuidado de tu salud y la de tu familia.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Especialidades
            </h3>
            <ul className="space-y-3">
              {specialties.map((s) => (
                <li key={s}>
                  <Link
                    to={`/especialidades`}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start space-x-3">
                    <Icon size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Redes sociales
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 text-gray-400 hover:bg-[#2563EB] hover:text-white transition-all duration-200"
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Clínica SaludTotal. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              Términos y condiciones
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
