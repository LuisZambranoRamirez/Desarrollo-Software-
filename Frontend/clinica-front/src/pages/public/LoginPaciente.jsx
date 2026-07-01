import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext.jsx';

function LoginPaciente() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(form);

      if (user.rol !== 'paciente') {
        setError('Esta cuenta no pertenece a un paciente.');
        return;
      }

      navigate('/dashboard-paciente');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-16">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-8">
                  Iniciar sesion - Paciente
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Correo"
                    name="email"
                    type="email"
                    placeholder="paciente@correo.com"
                    icon={Mail}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Contrasena"
                    name="password"
                    type="password"
                    placeholder="********"
                    icon={Lock}
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  {error && (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                      {error}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#4B5563]">
                      <input
                        type="checkbox"
                        className="rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      Recordarme
                    </label>
                    <a href="#" className="text-sm text-[#2563EB] hover:underline">
                      Olvidaste tu contrasena?
                    </a>
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Ingresando...' : 'Iniciar sesion'}
                  </Button>
                </form>
                <p className="text-center text-sm text-[#6B7280] mt-6">
                  No tienes cuenta?{' '}
                  <a href="#" className="text-[#2563EB] hover:underline font-medium">
                    Crear cuenta
                  </a>
                </p>
                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#6B7280]">Eres medico? </span>
                  <button type="button" onClick={() => navigate('/login-medico')} className="text-sm text-[#2563EB] hover:underline font-medium">
                    Ingresa aqui
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
