import { useEffect, useState, useRef, useCallback } from 'react';
import { doctors } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Search, Plus, X, Camera, Scan, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../services/api.js';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Medicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuracion', path: '/dashboard-callcenter/configuracion' },
];

function mapDoctor(doctor) {
  const name = `${doctor.usuario.nombre} ${doctor.usuario.apellido}`;
  return {
    id: doctor.id,
    name,
    specialty: doctor.especialidad_id ? `Especialidad ${doctor.especialidad_id}` : 'Sin especialidad',
    experience: doctor['años_experiencia'] ?? doctor['a\u00f1os_experiencia'] ?? 0,
    photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=200`,
  };
}

function validarDoctorForm(f) {
  const e = {};
  if (!f.nombre.trim() || f.nombre.trim().length < 2) e.nombre = 'Minimo 2 caracteres';
  if (!f.apellido.trim() || f.apellido.trim().length < 2) e.apellido = 'Minimo 2 caracteres';
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Correo invalido';
  if (!f.password || f.password.length < 6) e.password = 'Minimo 6 caracteres';
  if (f.telefono.trim() && !/^[\d\s+\-()]{7,20}$/.test(f.telefono.trim())) e.telefono = 'Telefono invalido';
  if (!f.cedula.trim()) e.cedula = 'Campo requerido';
  if (f.experiencia && !/^\d+$/.test(f.experiencia)) e.experiencia = 'Solo numeros';
  return e;
}

function MedicosCallCenter() {
  const [search, setSearch] = useState('');
  const [doctorList, setDoctorList] = useState(doctors);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', telefono: '', cedula: '', especialidad: '', experiencia: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [facialStatus, setFacialStatus] = useState('idle');
  const [facialMsg, setFacialMsg] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
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
    let mounted = true;
    api.getDoctores()
      .then((data) => {
        if (!mounted) return;
        setDoctorList(data.map(mapDoctor));
        setError('');
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const filtered = doctorList.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const updateField = (field, value) => {
    let val = value;
    if (field === 'nombre' || field === 'apellido') val = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    if (field === 'telefono') val = value.replace(/[^\d\s+\-()]/g, '');
    if (field === 'experiencia') val = value.replace(/\D/g, '');
    setForm((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setFacialStatus('capture');
      setFacialMsg('Presiona "Capturar" para fotografiar al medico');
      await new Promise((r) => setTimeout(r, 50));
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch {
      setFacialStatus('error');
      setFacialMsg('Error al acceder a la camara');
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(base64);
    stopCamera();
    setFacialStatus('idle');
    setFacialMsg('');
  };

  const cancelCamera = () => {
    stopCamera();
    setFacialStatus('idle');
    setFacialMsg('');
  };

  const closeModal = () => {
    stopCamera();
    setShowModal(false);
    setForm({ nombre: '', apellido: '', email: '', password: '', telefono: '', cedula: '', especialidad: '', experiencia: '' });
    setFormErrors({});
    setSubmitError('');
    setSubmitSuccess('');
    setFacialStatus('idle');
    setFacialMsg('');
    setCapturedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validarDoctorForm(form);
    setFormErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitError('');
    setSubmitSuccess('');
    setIsSubmitting(true);

    try {
      const payload = {
        usuario: {
          email: form.email,
          password: form.password,
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: form.telefono || '',
          rol: 'doctor',
          login_facial_habilitado: !!capturedImage,
        },
        cedula_profesional: form.cedula,
        años_experiencia: form.experiencia ? parseInt(form.experiencia, 10) : 0,
        especialidad_id: form.especialidad ? parseInt(form.especialidad, 10) : null,
      };

      const created = await api.registerMedico(payload);
      const doctorId = created.id || created.doctor?.id;

      if (capturedImage && doctorId) {
        try {
          await api.post('/api/facial/register-for-user', {
            usuario_id: doctorId,
            imageBase64: capturedImage,
          });
        } catch {
          setSubmitSuccess('Medico creado, pero no se pudo registrar el rostro. Puede hacerlo despues desde su perfil.');
          setIsSubmitting(false);
          return;
        }
      }

      setSubmitSuccess('Medico creado exitosamente.');
      setDoctorList((prev) => [
        {
          id: doctorId,
          name: `${form.nombre} ${form.apellido}`,
          specialty: form.especialidad ? `Especialidad ${form.especialidad}` : 'Sin especialidad',
          experience: form.experiencia || 0,
          photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.nombre + '+' + form.apellido)}&background=2563EB&color=fff&size=200`,
        },
        ...prev,
      ]);

      setTimeout(closeModal, 1500);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Directorio Medico</h1>
            <p className="text-gray-500 text-sm mt-1">
              {isLoading ? 'Cargando...' : `${doctorList.length} medicos registrados`}
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <Plus size={18} className="mr-2" /> Crear Medico
          </Button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
            Error de conexion: {error}. Mostrando datos locales.
          </p>
        )}

        <div className="relative max-w-md mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <Card key={doc.id} hover>
              <div className="flex items-center space-x-4">
                <img src={doc.photo} alt={doc.name} className="w-14 h-14 rounded-full" />
                <div>
                  <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.specialty}</p>
                  <p className="text-xs text-gray-400">{doc.experience} anos de experiencia</p>
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-400 col-span-full text-center py-8">No se encontraron medicos</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Medico</h2>
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre" value={form.nombre} onChange={(e) => updateField('nombre', e.target.value)} error={formErrors.nombre} required />
                <Input label="Apellido" value={form.apellido} onChange={(e) => updateField('apellido', e.target.value)} error={formErrors.apellido} required />
              </div>
              <Input label="Correo" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} error={formErrors.email} required />
              <Input label="Contrasena" type="password" value={form.password} onChange={(e) => updateField('password', e.target.value)} error={formErrors.password} required />
              <Input label="Telefono" value={form.telefono} onChange={(e) => updateField('telefono', e.target.value)} error={formErrors.telefono} />
              <Input label="Cedula profesional" value={form.cedula} onChange={(e) => updateField('cedula', e.target.value)} error={formErrors.cedula} required />
              <Input label="Especialidad (ID)" value={form.especialidad} onChange={(e) => updateField('especialidad', e.target.value)} />
              <Input label="Anos de experiencia" value={form.experiencia} onChange={(e) => updateField('experiencia', e.target.value)} error={formErrors.experiencia} />

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Registro Facial (opcional)</p>
                {facialStatus === 'idle' && !capturedImage && (
                  <Button type="button" variant="secondary" size="sm" onClick={openCamera}>
                    <Camera size={16} className="mr-2" /> Tomar foto
                  </Button>
                )}
                {facialStatus === 'capture' && (
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ height: 200 }}>
                    <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      <Button type="button" variant="primary" size="sm" onClick={captureImage}>
                        <Scan size={14} className="mr-1" /> Capturar
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="text-white border border-white/30" onClick={cancelCamera}>
                        <X size={14} className="mr-1" /> Cancelar
                      </Button>
                    </div>
                  </div>
                )}
                {facialStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    <span>{facialMsg}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setFacialStatus('idle'); setFacialMsg(''); }}>Reintentar</Button>
                  </div>
                )}
                {capturedImage && (
                  <div className="flex items-center gap-3">
                    <img src={capturedImage} alt="Foto capturada" className="w-16 h-16 rounded-lg object-cover border" />
                    <div>
                      <p className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Foto capturada</p>
                      <Button type="button" variant="ghost" size="sm" className="text-gray-500" onClick={() => { setCapturedImage(null); setFacialStatus('idle'); }}>Eliminar</Button>
                    </div>
                  </div>
                )}
              </div>

              {submitError && <p className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">{submitError}</p>}
              {submitSuccess && <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">{submitSuccess}</p>}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" className="flex-1" onClick={closeModal}>Cancelar</Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (<> <Loader2 size={16} className="animate-spin mr-2" /> Creando...</>) : 'Crear Medico'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicosCallCenter;
