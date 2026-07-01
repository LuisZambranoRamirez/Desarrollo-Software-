import { useState, useRef, useCallback, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Heart, Save, X, Camera, Scan, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { facialService } from '../../services/facialService.js';
import { api } from '../../services/api.js';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const initialDoctorInfo = {
  name: 'Mi Perfil',
  type: 'Médico especialista',
  specialty: 'Cardiología',
  subspecialty: 'Cardiología clínica y prevención cardiovascular',
  experience: '18 años',
  email: 'carlos.mendoza@clinicasaludtotal.com',
  phone: '+51 999 888 777',
  license: 'CMP 45231',
  office: 'Consultorio 304 - Torre Médica',
  schedule: 'Lun - Vie, 8:00 AM - 2:00 PM',
  languages: 'Español, Inglés',
  bio: 'Especialista en diagnóstico, control y prevención de enfermedades cardiovasculares, con enfoque en atención integral del paciente adulto.',
};

const fieldLabels = {
  type: 'Tipo de médico',
  specialty: 'Especialidad',
  subspecialty: 'Subespecialidad',
  experience: 'Experiencia',
  email: 'Email',
  phone: 'Teléfono',
  license: 'Licencia',
  office: 'Consultorio',
  schedule: 'Horario de atención',
  languages: 'Idiomas',
};

function validarPerfil(draft) {
  const e = {};
  if (!draft.name.trim() || draft.name.trim().length < 2) e.name = 'Minimo 2 caracteres';
  if (!draft.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) e.email = 'Correo invalido';
  if (draft.phone.trim() && !/^[\d\s+\-()]{7,20}$/.test(draft.phone.trim())) e.phone = 'Telefono invalido';
  return e;
}

function PerfilMedico() {
  const { user } = useAuth();
  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [draftInfo, setDraftInfo] = useState(initialDoctorInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const [facialStatus, setFacialStatus] = useState('idle');
  const [facialMsg, setFacialMsg] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
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

  useEffect(() => {
    if (user) {
      setDoctorInfo(prev => ({ ...prev, name: `Dr. ${user.nombre} ${user.apellido}` }));
      setDraftInfo(prev => ({ ...prev, name: `Dr. ${user.nombre} ${user.apellido}` }));
    }
    api.getReferenceImage()
      .then(data => {
        setReferenceImage(data.imageBase64);
        setFacialStatus('success');
        setFacialMsg('Rostro registrado correctamente');
      })
      .catch(() => setReferenceImage(null));
  }, [user]);

  const registerFace = async () => {
    setFacialStatus('init');
    setFacialMsg('Iniciando cámara...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setFacialStatus('capture');
      setFacialMsg('Presiona "Capturar" para registrar tu rostro');
      await new Promise((r) => setTimeout(r, 50));
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      setFacialStatus('error');
      setFacialMsg('Error al acceder a la cámara');
    }
  };

  const captureAndRegister = async () => {
    setFacialStatus('verifying');
    setFacialMsg('Registrando rostro...');

    await new Promise((r) => setTimeout(r, 200));

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.8);

    try {
      const res = await facialService.registerFace(base64);
      if (res.success) {
        const img = await api.getReferenceImage().catch(() => null);
        setReferenceImage(img?.imageBase64 ?? base64);
        setFacialStatus('success');
        setFacialMsg('Rostro registrado correctamente');
        stopCamera();
      } else {
        setFacialStatus('error');
        setFacialMsg(res.message || 'Error al registrar rostro');
        stopCamera();
      }
    } catch (err) {
      setFacialStatus('error');
      setFacialMsg(err.message || 'Error al registrar rostro');
      stopCamera();
    }
  };

  const cancelFacial = () => {
    stopCamera();
    setFacialStatus('idle');
    setFacialMsg('');
  };

  const updateDraft = (field, value) => {
    let val = value;
    if (field === 'name') val = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    if (field === 'phone') val = value.replace(/[^\d\s+\-()]/g, '');
    setDraftInfo((current) => ({ ...current, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const startEditing = () => {
    setDraftInfo(doctorInfo);
    setErrors({});
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftInfo(doctorInfo);
    setErrors({});
    setIsEditing(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    const v = validarPerfil(draftInfo);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setDoctorInfo(draftInfo);
    setIsEditing(false);
  };

  const visibleInfo = isEditing ? draftInfo : doctorInfo;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName={doctorInfo.name} />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={saveProfile} noValidate>
          <Card>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <img
                src="https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563EB&color=fff&size=200"
                alt={doctorInfo.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />

              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="text-center md:text-left">
                      {isEditing ? (
                        <Input
                          label="Nombre"
                          value={draftInfo.name}
                          onChange={(event) => updateDraft('name', event.target.value)}
                          error={errors.name}
                          required
                        />
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold text-gray-900">{doctorInfo.name}</h2>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                          <Heart size={18} className="text-red-500" />
                          <span className="text-[#2563EB] font-medium">{doctorInfo.specialty}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-center md:justify-end gap-2">
                    {isEditing ? (
                      <>
                        <Button type="button" variant="ghost" onClick={cancelEditing}>
                          <X size={18} className="mr-2" /> Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                          <Save size={18} className="mr-2" /> Guardar
                        </Button>
                      </>
                    ) : (
                      <Button type="button" variant="primary" onClick={startEditing}>
                        <User size={18} className="mr-2" /> Editar Perfil
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  {Object.entries(fieldLabels).map(([field, label]) => (
                    <div key={field}>
                      {isEditing ? (
                        <Input
                          label={label}
                          value={draftInfo[field]}
                          onChange={(event) => updateDraft(field, event.target.value)}
                          error={errors[field]}
                          required={field !== 'subspecialty'}
                        />
                      ) : (
                        <>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="text-base font-medium text-gray-900">{visibleInfo[field]}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-1">Perfil profesional</p>
                  {isEditing ? (
                    <textarea
                      value={draftInfo.bio}
                      onChange={(event) => updateDraft('bio', event.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      required
                    />
                  ) : (
                    <p className="text-base leading-relaxed text-gray-900">{doctorInfo.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </form>

        <Card className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Reconocimiento Facial</h3>
              <p className="text-sm text-gray-500 mt-1">Registra tu rostro para iniciar sesion sin contrasena</p>
            </div>
            {facialStatus === 'idle' && (
              <Button type="button" variant="primary" onClick={registerFace}>
                <Camera size={18} className="mr-2" /> Registrar rostro
              </Button>
            )}
            {facialStatus === 'success' && (
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-medium">Registrado</span>
                {referenceImage && (
                  <img src={referenceImage} alt="" className="w-8 h-8 rounded-full object-cover border border-green-300 ml-1" />
                )}
                <button
                  type="button"
                  onClick={() => { setFacialStatus('idle'); setFacialMsg(''); setReferenceImage(null); }}
                  className="ml-auto text-xs text-[#2563EB] hover:underline"
                >
                  Reemplazar foto
                </button>
              </div>
            )}
          </div>

            {(facialStatus === 'init' || facialStatus === 'capture' || facialStatus === 'verifying') && (
            <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ height: 280 }}>
              <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              {facialStatus === 'init' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Loader2 size={36} className="animate-spin mb-3" />
                  <p className="text-sm">{facialMsg}</p>
                </div>
              )}
              {facialStatus === 'verifying' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                  <Loader2 size={36} className="animate-spin mb-3" />
                  <p className="text-sm">{facialMsg}</p>
                </div>
              )}
              {facialStatus === 'capture' && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  <Button variant="primary" size="sm" onClick={captureAndRegister}>
                    <Scan size={16} className="mr-2" /> Capturar y registrar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white border border-white/30" onClick={cancelFacial}>
                    <X size={16} className="mr-2" /> Cancelar
                  </Button>
                </div>
              )}
            </div>
          )}

          {facialStatus === 'error' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-700">{facialMsg}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-red-600" onClick={cancelFacial}>
                  Volver
                </Button>
              </div>
            </div>
          )}

          {facialStatus === 'success' && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-green-700">Tu rostro ha sido registrado correctamente. Ya puedes usar inicio de sesion facial.</p>
                </div>
              </div>
              {referenceImage && (
                <img src={referenceImage} alt="Rostro registrado" className="w-32 h-32 rounded-xl object-cover border border-green-300" />
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default PerfilMedico;
