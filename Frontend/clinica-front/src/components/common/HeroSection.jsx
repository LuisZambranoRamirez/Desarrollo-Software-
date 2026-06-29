import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] h-[90vh] min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tu salud, nuestra prioridad
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-xl">
              Brindamos atención médica de excelencia con profesionales altamente calificados
              y tecnología de vanguardia para cuidar de ti y tu familia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/login-paciente"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-xl bg-white text-[#2563EB] hover:bg-blue-50 hover:shadow-lg transition-all duration-200"
              >
                Reservar cita
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-xl border-2 border-white text-white hover:bg-white hover:text-[#2563EB] transition-all duration-200"
              >
                Contáctanos
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
              <HeartPulse size={280} className="text-white/20 relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
