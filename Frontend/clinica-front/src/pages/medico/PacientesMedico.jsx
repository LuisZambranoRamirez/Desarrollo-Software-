import { useMemo, useState } from 'react';
import { doctorDashboardData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Table from '../../components/ui/Table.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Badge from '../../components/ui/Badge.jsx';
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  User,
  Bell,
  Search,
  FileText,
  Phone,
  Mail,
  HeartPulse,
  AlertCircle,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const patientDetails = {
  1: {
    dni: '12345678',
    phone: '+51 999 888 777',
    email: 'juan.perez@email.com',
    bloodType: 'O+',
    allergies: 'Penicilina, polen',
    risk: 'Alto',
    nextAppointment: '2026-06-25 10:00',
    treatment: 'Enalapril 10 mg cada 24 horas',
    notes: 'Controlar presión arterial y adherencia al tratamiento.',
  },
  2: {
    dni: '45678912',
    phone: '+51 988 777 666',
    email: 'maria.lopez@email.com',
    bloodType: 'A+',
    allergies: 'Ninguna registrada',
    risk: 'Bajo',
    nextAppointment: '2026-06-25 11:30',
    treatment: 'Control preventivo anual',
    notes: 'Paciente estable. Mantener seguimiento general.',
  },
  3: {
    dni: '78912345',
    phone: '+51 977 666 555',
    email: 'carlos.ruiz@email.com',
    bloodType: 'B+',
    allergies: 'Sulfas',
    risk: 'Alto',
    nextAppointment: '2026-06-26 09:00',
    treatment: 'Metformina 850 mg y plan nutricional',
    notes: 'Revisar resultados de glucosa y ajustar medicación si corresponde.',
  },
  4: {
    dni: '32165498',
    phone: '+51 966 555 444',
    email: 'ana.torres@email.com',
    bloodType: 'AB+',
    allergies: 'Látex',
    risk: 'Medio',
    nextAppointment: '2026-06-26 15:00',
    treatment: 'Crema tópica y fotoprotección',
    notes: 'Evaluar evolución de lesiones cutáneas.',
  },
  5: {
    dni: '65498732',
    phone: '+51 955 444 333',
    email: 'jose.hernandez@email.com',
    bloodType: 'O-',
    allergies: 'Aspirina',
    risk: 'Medio',
    nextAppointment: '2026-06-27 08:30',
    treatment: 'Evaluación neurológica y control de síntomas',
    notes: 'Traer estudios previos para comparación.',
  },
};

const riskBadge = {
  Alto: 'red',
  Medio: 'yellow',
  Bajo: 'green',
};

function PacientesMedico() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = useMemo(
    () =>
      doctorDashboardData.patients.map((patient) => ({
        ...patient,
        ...patientDetails[patient.id],
      })),
    []
  );

  const filtered = patients.filter((patient) => {
    const value = search.toLowerCase();

    return (
      patient.name.toLowerCase().includes(value) ||
      patient.condition.toLowerCase().includes(value) ||
      patient.dni.includes(value)
    );
  });

  const stats = [
    { label: 'Total pacientes', value: patients.length, icon: Users, color: 'text-[#2563EB]', bg: 'bg-[#EEF2FF]' },
    { label: 'Riesgo alto', value: patients.filter((patient) => patient.risk === 'Alto').length, icon: AlertCircle, color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]' },
    { label: 'Con cita próxima', value: patients.filter((patient) => patient.nextAppointment).length, icon: Calendar, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
  ];

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'age', label: 'Edad' },
    { key: 'condition', label: 'Condición' },
    {
      key: 'risk',
      label: 'Riesgo',
      render: (risk) => <Badge variant={riskBadge[risk] || 'gray'}>{risk}</Badge>,
    },
    { key: 'lastVisit', label: 'Última visita' },
    { key: 'nextAppointment', label: 'Próxima cita' },
    {
      key: 'actions',
      label: 'Acciones',
      render: (_, patient) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}>
          <FileText size={16} className="mr-1" /> Ver
        </Button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mis Pacientes</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, DNI o condición..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
            />
          </div>
        </Card>

        <Card>
          <Table columns={columns} data={filtered} />
        </Card>
      </div>

      <Modal
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        title="Información del paciente"
        size="lg"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                <p className="text-sm text-gray-500">{selectedPatient.age} años · DNI {selectedPatient.dni}</p>
              </div>
              <Badge variant={riskBadge[selectedPatient.risk] || 'gray'}>
                Riesgo {selectedPatient.risk}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem icon={HeartPulse} label="Condición" value={selectedPatient.condition} />
              <InfoItem icon={Calendar} label="Última visita" value={selectedPatient.lastVisit} />
              <InfoItem icon={Calendar} label="Próxima cita" value={selectedPatient.nextAppointment} />
              <InfoItem icon={User} label="Tipo de sangre" value={selectedPatient.bloodType} />
              <InfoItem icon={Phone} label="Teléfono" value={selectedPatient.phone} />
              <InfoItem icon={Mail} label="Correo" value={selectedPatient.email} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailBlock title="Alergias" text={selectedPatient.allergies} />
              <DetailBlock title="Tratamiento actual" text={selectedPatient.treatment} />
            </div>

            <DetailBlock title="Notas médicas" text={selectedPatient.notes} />
          </div>
        )}
      </Modal>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-3">
      <Icon size={18} className="mt-0.5 text-[#2563EB]" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{text}</p>
    </div>
  );
}

export default PacientesMedico;
