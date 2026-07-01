import { useEffect, useState } from 'react';
import { doctors } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Search } from 'lucide-react';
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
    experience: doctor['a\u00c3\u00b1os_experiencia'] ?? doctor['a\u00f1os_experiencia'] ?? 0,
    photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=200`,
  };
}

function MedicosCallCenter() {
  const [search, setSearch] = useState('');
  const [doctorList, setDoctorList] = useState(doctors);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    api.getDoctores()
      .then((data) => {
        if (!isMounted) return;
        setDoctorList(data.map(mapDoctor));
        setError('');
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = doctorList.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Directorio Medico</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? 'Cargando medicos desde el backend...' : 'Directorio de medicos disponibles'}
          </p>
          {error && (
            <p className="mt-2 text-sm text-amber-700">
              No se pudo cargar el backend. Mostrando datos de prueba. Detalle: {error}
            </p>
          )}
        </div>

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
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-14 h-14 rounded-full"
                />
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
    </div>
  );
}

export default MedicosCallCenter;
