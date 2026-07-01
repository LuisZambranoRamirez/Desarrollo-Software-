import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, MapPin, AlertCircle, HeartPulse } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { api } from '../../services/api.js';

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
  if (form.direccion.trim() && form.direccion.trim().length < 5) e.direccion = 'Minimo 5 caracteres';
  return e;
}

function RegisterPaciente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '',
    telefono: '', fecha_nacimiento: '', genero: '', direccion: '', alergias: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === 'nombre' || name === 'apellido') val = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    if (name === 'telefono') val = value.replace(/[^\d\s+\-()]/g, '');
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
      await api.registerPaciente({
        usuario: {
          email: form.email, password: form.password,
          nombre: form.nombre.trim(), apellido: form.apellido.trim(),
          telefono: form.telefono.trim() || null, rol: 'paciente',
          login_facial_habilitado: false,
        },
        fecha_nacimiento: form.fecha_nacimiento || null,
        genero: form.genero || null,
        direccion: form.direccion.trim() || null,
        alergias: form.alergias.trim() || null,
      });
      navigate('/login-paciente');
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
                  Crear cuenta - Paciente
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Nombre" name="nombre" type="text" placeholder="Juan" icon={User} value={form.nombre} onChange={handleChange} error={errors.nombre} required />
                    <Input label="Apellido" name="apellido" type="text" placeholder="Perez" icon={User} value={form.apellido} onChange={handleChange} error={errors.apellido} required />
                  </div>
                  <Input label="Correo electronico" name="email" type="email" placeholder="paciente@correo.com" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} required />
                  <Input label="Contrasena" name="password" type="password" placeholder="********" icon={Lock} value={form.password} onChange={handleChange} error={errors.password} required />
                  <Input label="Telefono" name="telefono" type="tel" placeholder="+51 999 888 777" icon={Phone} value={form.telefono} onChange={handleChange} error={errors.telefono} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Fecha de nacimiento" name="fecha_nacimiento" type="date" icon={Calendar} value={form.fecha_nacimiento} onChange={handleChange} />
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1">Genero</label>
                      <select name="genero" value={form.genero} onChange={handleChange} className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                  <Input label="Direccion" name="direccion" type="text" placeholder="Av. Principal 123" icon={MapPin} value={form.direccion} onChange={handleChange} error={errors.direccion} />
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Alergias</label>
                    <textarea name="alergias" value={form.alergias} onChange={handleChange} placeholder="Ninguna" rows={2} className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] resize-none" />
                  </div>
                  {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 flex items-center gap-2"><AlertCircle size={16} />{error}</p>}
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Button>
                </form>
                <p className="text-center text-sm text-[#6B7280] mt-6">
                  Ya tienes cuenta? <Link to="/login-paciente" className="text-[#2563EB] hover:underline font-medium">Inicia sesion</Link>
                </p>
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

export default RegisterPaciente;
