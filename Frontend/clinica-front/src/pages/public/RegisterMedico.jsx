import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Award, Stethoscope, AlertCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { api } from '../../services/api.js';

const ESPECIALIDADES = [
  { id: 1, nombre: 'Medicina General' },
  { id: 2, nombre: 'Cardiologia' },
  { id: 3, nombre: 'Pediatria' },
  { id: 4, nombre: 'Dermatologia' },
  { id: 5, nombre: 'Neurologia' },
  { id: 6, nombre: 'Ginecologia' },
  { id: 7, nombre: 'Oftalmologia' },
  { id: 8, nombre: 'Traumatologia' },
];

const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
const TELEFONO = /^[\d\s+\-()]{7,20}$/;

function validar(form) {
  const e = {};
  if (!form.nombre.trim() || form.nombre.trim().length < 2) e.nombre = 'Minimo 2 caracteres';
  else if (!SOLO_LETRAS.test(form.nombre.trim())) e.nombre = 'Solo letras';
  if (!form.apellido.trim() || form.apellido.trim().length < 2) e.apellido = 'Minimo 2 caracteres';
  else if (!SOLO_LETRAS.test(form.apellido.trim())) e.apellido = 'Solo letras';
  if (!form.email.trim()) e.email = 'Campo requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo invalido';
  if (!form.password) e.password = 'Campo requerido';
  else if (form.password.length < 6) e.password = 'Minimo 6 caracteres';
  if (form.telefono.trim() && !TELEFONO.test(form.telefono.trim())) e.telefono = 'Formato invalido (solo numeros, +, -, espacios)';
  if (form.años_experiencia && (isNaN(Number(form.años_experiencia)) || Number(form.años_experiencia) < 0)) e.años_experiencia = 'Debe ser un numero valido';
  return e;
}

function RegisterMedico() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '',
    telefono: '', cedula_profesional: '', especialidad_id: '', años_experiencia: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'nombre' || name === 'apellido') val = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    if (name === 'telefono') val = value.replace(/[^\d\s+\-()]/g, '');
    if (name === 'años_experiencia') val = value.replace(/\D/g, '');
    setForm((prev) => ({ ...prev, [name]: val }));
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
      await api.registerMedico({
        usuario: {
          email: form.email, password: form.password,
          nombre: form.nombre.trim(), apellido: form.apellido.trim(),
          telefono: form.telefono.trim() || null, rol: 'doctor',
          login_facial_habilitado: false,
        },
        especialidad_id: form.especialidad_id ? Number(form.especialidad_id) : null,
        cedula_profesional: form.cedula_profesional.trim() || null,
        años_experiencia: form.años_experiencia ? Number(form.años_experiencia) : 0,
      });
      navigate('/login-medico');
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
                  Registro - Medico
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Nombre" name="nombre" type="text" placeholder="Carlos" icon={User} value={form.nombre} onChange={handleChange} error={errors.nombre} required />
                    <Input label="Apellido" name="apellido" type="text" placeholder="Lopez" icon={User} value={form.apellido} onChange={handleChange} error={errors.apellido} required />
                  </div>
                  <Input label="Correo institucional" name="email" type="email" placeholder="medico@clinica.com" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} required />
                  <Input label="Contrasena" name="password" type="password" placeholder="********" icon={Lock} value={form.password} onChange={handleChange} error={errors.password} required />
                  <Input label="Telefono" name="telefono" type="tel" placeholder="+51 999 888 777" icon={Phone} value={form.telefono} onChange={handleChange} error={errors.telefono} />
                  <Input label="Cedula profesional" name="cedula_profesional" type="text" placeholder="CMP-12345" icon={Award} value={form.cedula_profesional} onChange={handleChange} />
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Especialidad</label>
                    <select name="especialidad_id" value={form.especialidad_id} onChange={handleChange} className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
                      <option value="">Seleccionar especialidad</option>
                      {ESPECIALIDADES.map((esp) => <option key={esp.id} value={esp.id}>{esp.nombre}</option>)}
                    </select>
                  </div>
                  <Input label="Anios de experiencia" name="años_experiencia" type="number" placeholder="5" icon={Stethoscope} value={form.años_experiencia} onChange={handleChange} error={errors.años_experiencia} min={0} />
                  {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}</p>}
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </form>
                <p className="text-center text-sm text-[#6B7280] mt-6">
                  Ya tienes cuenta? <Link to="/login-medico" className="text-[#2563EB] hover:underline font-medium">Inicia sesion</Link>
                </p>
              </div>
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

export default RegisterMedico;
