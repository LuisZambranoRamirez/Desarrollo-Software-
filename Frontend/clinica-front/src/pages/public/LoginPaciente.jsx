import { useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

function LoginPaciente() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard-paciente');
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-16">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-8">
                  Iniciar Sesión - Paciente
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Correo"
                    type="email"
                    placeholder="paciente@correo.com"
                    icon={Mail}
                  />
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#4B5563]">
                      <input
                        type="checkbox"
                        className="rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      Recordarme
                    </label>
                    <a href="#" className="text-sm text-[#2563EB] hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Iniciar Sesión
                  </Button>
                </form>
                <p className="text-center text-sm text-[#6B7280] mt-6">
                  ¿No tienes cuenta?{' '}
                  <a href="#" className="text-[#2563EB] hover:underline font-medium">
                    Crear cuenta
                  </a>
                </p>
                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#6B7280]">¿Eres médico? </span>
                  <button type="button" onClick={() => navigate('/login-medico')} className="text-sm text-[#2563EB] hover:underline font-medium">
                    Ingresa aquí
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-full flex items-center justify-center">
                  <HeartPulse size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LoginPaciente;
