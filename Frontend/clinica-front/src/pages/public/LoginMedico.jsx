import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Camera, AlertCircle, Loader2, CheckCircle, X } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext.jsx';
import { facialService } from '../../services/facialService.js';

function validar(form) {
  const e = {};
  if (!form.email.trim()) e.email = 'Campo requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo invalido';
  if (!form.password) e.password = 'Campo requerido';
  return e;
}

function LoginMedico() {
  const navigate = useNavigate();
  const { login, setSession } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showFacial, setShowFacial] = useState(false);
  const [facialStep, setFacialStep] = useState('idle');
  const [facialMsg, setFacialMsg] = useState('');
  const [challengeMsg, setChallengeMsg] = useState('');
  const [sessionToken, setSessionToken] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validar(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setError('');
    setIsLoading(true);

    try {
      const user = await login(form);

      if (user.rol !== 'doctor') {
        setError('Esta cuenta no pertenece a un medico.');
        return;
      }

      navigate('/dashboard-medico');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startFacialAuth = async () => {
    setError('');
    setShowFacial(true);
    setFacialStep('init');
    setFacialMsg('Iniciando autenticación facial...');

    try {
      const session = await facialService.startAuth();
      setSessionToken(session.sessionToken);
      setChallengeMsg(session.message);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      setFacialStep('capture');
      setFacialMsg(session.message);

      await new Promise((r) => setTimeout(r, 50));
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      setFacialStep('error');
      setFacialMsg(err.message || 'Error al acceder a la cámara');
    }
  };

  const captureAndVerify = async () => {
    setFacialStep('verifying');
    setFacialMsg('Verificando identidad...');

    await new Promise((r) => setTimeout(r, 200));

    const frames = [];
    for (let i = 0; i < 5; i++) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video || !video.videoWidth) break;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      frames.push({ imageBase64: base64, timestamp: Date.now() });
      if (i < 4) await new Promise((r) => setTimeout(r, 300));
    }

    try {
      const res = await facialService.verifyAuth(sessionToken, frames);
      if (res.authenticated) {
        setSession(res.accessToken, {
          id: res.userId,
          nombre: res.fullName?.split(' ')[0] || '',
          apellido: res.fullName?.split(' ').slice(1).join(' ') || '',
          rol: res.role,
          email: '',
        });
        setFacialStep('success');
        setFacialMsg('¡Autenticación exitosa!');
        stopCamera();
        setTimeout(() => navigate('/dashboard-medico'), 1000);
      } else {
        setFacialStep('error');
        setFacialMsg(res.message || 'No se pudo verificar la identidad');
        stopCamera();
      }
    } catch (err) {
      setFacialStep('error');
      setFacialMsg(err.message || 'Error en la verificación');
      stopCamera();
    }
  };

  const cancelFacial = () => {
    stopCamera();
    setShowFacial(false);
    setFacialStep('idle');
    setFacialMsg('');
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-16">
            <div className="w-full max-w-md">
              {!showFacial ? (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-8">
                    Iniciar sesion - Medico
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <Input
                      label="Codigo medico"
                      type="text"
                      placeholder="CMP-12345"
                    />
                    <Input
                      label="Correo institucional"
                      name="email"
                      type="email"
                      placeholder="medico@clinica.com"
                      icon={Mail}
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
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
                      error={errors.password}
                      required
                    />
                    {error && (
                      <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                      </p>
                    )}
                    <div className="flex items-center justify-end">
                      <a href="#" className="text-sm text-[#2563EB] hover:underline">
                        Olvidaste tu contrasena?
                      </a>
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Ingresando...' : 'Iniciar sesion'}
                    </Button>
                  </form>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                    <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-gray-500">o</span></div>
                  </div>
                  <Button variant="outline" size="lg" className="w-full" onClick={startFacialAuth}>
                    <Camera size={18} className="mr-2" />
                    Iniciar con reconocimiento facial
                  </Button>
                  <div className="text-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-[#6B7280]">Eres paciente? </span>
                    <button type="button" onClick={() => navigate('/login-paciente')} className="text-sm text-[#2563EB] hover:underline font-medium">
                      Ingresa aqui
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1F2937]">Reconocimiento Facial</h2>
                    <button onClick={cancelFacial} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
                  </div>

                  <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ height: 320 }}>
                    <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    {facialStep === 'init' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <Loader2 size={40} className="animate-spin mb-3" />
                        <p className="text-sm">{facialMsg}</p>
                      </div>
                    )}
                    {facialStep === 'error' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900">
                        <AlertCircle size={48} className="text-red-400 mb-3" />
                        <p className="text-sm text-center px-4">{facialMsg}</p>
                        <Button variant="primary" size="sm" className="mt-4" onClick={cancelFacial}>Volver</Button>
                      </div>
                    )}
                    {facialStep === 'success' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-green-600/80">
                        <CheckCircle size={48} className="mb-3" />
                        <p className="text-sm">{facialMsg}</p>
                      </div>
                    )}
                    {facialStep === 'verifying' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                        <Loader2 size={40} className="animate-spin mb-3" />
                        <p className="text-sm">{facialMsg}</p>
                      </div>
                    )}
                  </div>

                  {facialStep === 'capture' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-700 flex items-start gap-2">
                        <Camera size={18} className="shrink-0 mt-0.5" />
                        <span>{challengeMsg}</span>
                      </div>
                      <Button variant="primary" size="lg" className="w-full" onClick={captureAndVerify}>
                        Capturar y verificar
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-full flex items-center justify-center">
                  <Stethoscope size={120} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default LoginMedico;
