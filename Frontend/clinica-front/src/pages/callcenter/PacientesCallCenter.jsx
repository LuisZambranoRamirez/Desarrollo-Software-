import { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Table from '../../components/ui/Table.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, PhoneCall, UserCheck, Search } from 'lucide-react';
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

const mockPatients = [
  { id: 1, name: 'Maria Lopez', phone: '+51 999 111 222', lastCall: '10:15 AM' },
  { id: 2, name: 'Carlos Ruiz', phone: '+51 999 333 444', lastCall: '09:30 AM' },
  { id: 3, name: 'Ana Torres', phone: '+51 999 555 666', lastCall: '11:00 AM' },
  { id: 4, name: 'Jose Hernandez', phone: '+51 999 777 888', lastCall: '08:45 AM' },
  { id: 5, name: 'Roberto Diaz', phone: '+51 999 999 000', lastCall: 'Ayer 5:20 PM' },
  { id: 6, name: 'Sofia Vargas', phone: '+51 998 111 333', lastCall: 'Ayer 4:10 PM' },
  { id: 7, name: 'Fernando Rivas', phone: '+51 998 555 777', lastCall: 'Ayer 3:30 PM' },
  { id: 8, name: 'Pedro Sanchez', phone: '+51 998 888 999', lastCall: 'Hoy 7:50 AM' },
];

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'phone', label: 'Telefono' },
  { key: 'lastCall', label: 'Ultima llamada' },
  { key: 'actions', label: 'Acciones', render: () => (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">
        <UserCheck size={14} className="mr-1" /> Ver
      </Button>
      <Button variant="primary" size="sm">
        <PhoneCall size={14} className="mr-1" /> Llamar
      </Button>
    </div>
  )},
];

function mapPaciente(patient) {
  return {
    id: patient.id,
    name: `${patient.usuario.nombre} ${patient.usuario.apellido}`,
    phone: patient.usuario.telefono ?? 'Sin telefono',
    lastCall: 'Sin llamadas',
  };
}

function PacientesCallCenter() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState(mockPatients);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    api.getPacientes()
      .then((data) => {
        if (!isMounted) return;
        setPatients(data.map(mapPaciente));
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

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestion de Pacientes</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? 'Cargando pacientes desde el backend...' : 'Directorio de pacientes del call center'}
          </p>
          {error && (
            <p className="mt-2 text-sm text-amber-700">
              No se pudo cargar el backend. Mostrando datos de prueba. Detalle: {error}
            </p>
          )}
        </div>

        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>
          </div>
          <Table columns={columns} data={filtered} />
        </Card>
      </div>
    </div>
  );
}

export default PacientesCallCenter;
