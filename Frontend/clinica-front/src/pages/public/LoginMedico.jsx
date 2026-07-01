import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Camera, AlertCircle, Loader2, CheckCircle, X } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { authService } from '../../services/authService';
import { facialService } from '../../services/facialService';
import { useAuth } from '../../context/AuthContext';

function LoginMedico() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      login(res.accessToken, res.user);
      navigate('/dashboard-medico');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      if (videoRef.current) videoRef.current.srcObject = stream;

      setFacialStep('capture');
      setFacialMsg(session.message);
    } catch (err) {
      setFacialStep('error');
      setFacialMsg(err.message || 'Error al acceder a la cámara');
    }
  };

  const captureAndVerify = async () => {
    setFacialStep('verifying');
    setFacialMsg('Verificando identidad...');

    const frames = [];
    for (let i = 0; i < 5; i++) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) break;
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
        login(res.accessToken, { id: res.userId, nombre: res.fullName?.split(' ')[0] || '', apellido: res.fullName?.split(' ').slice(1).join(' ') || '', rol: res.role, email: '' });
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
                    Iniciar Sesión - Médico
                  </h2>
                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <Input label="Código médico" type="text" placeholder="CMP-12345" />
                    <Input label="Correo institucional" type="email" placeholder="medico@clinica.com" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Contraseña" type="password" placeholder="••••••••" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="flex items-center justify-end">
                      <a href="#" className="text-sm text-[#2563EB] hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                      {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
                  <div className="text-center mt-6 pt-4 border-t border-gray-100">
                    <span className="text-sm text-[#6B7280]">¿Eres paciente? </span>
                    <button type="button" onClick={() => navigate('/login-paciente')} className="text-sm text-[#2563EB] hover:underline font-medium">Ingresa aquí</button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1F2937]">Reconocimiento Facial</h2>
                    <button onClick={cancelFacial} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
                  </div>

                  <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ minHeight: 320 }}>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ display: facialStep === 'capture' || facialStep === 'verifying' ? 'block' : 'none' }} />
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
