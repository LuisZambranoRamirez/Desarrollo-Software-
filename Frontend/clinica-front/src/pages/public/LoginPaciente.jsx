import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse, AlertCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

function LoginPaciente() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      login(res.accessToken, res.user);
      navigate('/dashboard-paciente');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
                  Iniciar Sesión - Paciente
                </h2>
                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Correo"
                    type="email"
                    placeholder="paciente@correo.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
