import { useMemo, useState } from 'react';
import { patientData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  User,
  Bell,
  ChevronRight,
  Search,
  FileText,
  Pill,
  Activity,
  Eye,
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

const patientOptions = [
  {
    id: 1,
    name: 'Juan Pérez',
    dni: '12345678',
    age: 45,
    bloodType: 'O+',
    allergies: 'Penicilina, polen',
    condition: 'Hipertensión',
    data: {
      ...patientData,
      medicalHistory: [
        { id: 1, date: '2026-01-15', type: 'Consulta', diagnosis: 'Hipertensión arterial', doctor: 'Dr. Carlos Mendoza', notes: 'Paciente con presión elevada. Se receta Enalapril.', treatment: 'Enalapril 10 mg cada 24 horas', exams: 'Control de presión arterial y perfil lipídico', priority: 'Alta' },
        { id: 2, date: '2025-08-20', type: 'Control', diagnosis: 'Control general', doctor: 'Dr. Luis García', notes: 'Resultados normales. Continuar con hábitos saludables.', treatment: 'Dieta baja en sodio y actividad física', exams: 'Hemograma completo', priority: 'Normal' },
        { id: 3, date: '2025-03-10', type: 'Urgencia', diagnosis: 'Infección respiratoria', doctor: 'Dra. María Fernández', notes: 'Infección viral. Reposo y tratamiento sintomático.', treatment: 'Antitérmico y reposo domiciliario', exams: 'Radiografía de tórax', priority: 'Media' },
      ],
    },
  },
  {
    id: 2,
    name: 'María López',
    dni: '45678912',
    age: 32,
    bloodType: 'A+',
    allergies: 'Ninguna registrada',
    condition: 'Control preventivo',
    data: {
      ...patientData,
      name: 'María López',
      medicalHistory: [
        { id: 1, date: '2026-05-10', type: 'Control', diagnosis: 'Control ginecológico', doctor: 'Dra. Patricia Ruiz', notes: 'Examen de rutina sin hallazgos.', treatment: 'Seguimiento anual', exams: 'Papanicolaou y ecografía', priority: 'Normal' },
        { id: 2, date: '2026-02-18', type: 'Consulta', diagnosis: 'Infección urinaria', doctor: 'Dr. Luis García', notes: 'Tratamiento con antibióticos completado.', treatment: 'Antibiótico por 7 días', exams: 'Urocultivo', priority: 'Media' },
      ],
    },
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    dni: '78912345',
    age: 55,
    bloodType: 'B+',
    allergies: 'Sulfas',
    condition: 'Diabetes tipo 2',
    data: {
      ...patientData,
      name: 'Carlos Ruiz',
      medicalHistory: [
        { id: 1, date: '2026-04-22', type: 'Consulta', diagnosis: 'Diabetes tipo 2', doctor: 'Dr. Carlos Mendoza', notes: 'Control de glucosa. Ajuste de metformina.', treatment: 'Metformina 850 mg cada 12 horas', exams: 'Glucosa en ayunas y HbA1c', priority: 'Alta' },
        { id: 2, date: '2025-11-15', type: 'Control', diagnosis: 'Hipercolesterolemia', doctor: 'Dr. Carlos Mendoza', notes: 'Dieta y estatinas prescritas.', treatment: 'Atorvastatina 20 mg nocturna', exams: 'Perfil lipídico', priority: 'Media' },
        { id: 3, date: '2025-07-30', type: 'Control', diagnosis: 'Control general', doctor: 'Dr. Roberto Sánchez', notes: 'Paciente en buen estado general.', treatment: 'Continuar hábitos saludables', exams: 'Hemograma completo', priority: 'Normal' },
      ],
    },
  },
];

const tabs = ['Todos', 'Consulta', 'Control', 'Urgencia'];

const typeBadge = {
  Consulta: 'blue',
  Control: 'green',
  Urgencia: 'red',
};

const priorityBadge = {
  Alta: 'red',
  Media: 'yellow',
  Normal: 'green',
};

function HistorialClinico() {
  const [selectedId, setSelectedId] = useState(patientOptions[0].id);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredPatients = patientOptions.filter((patient) => {
    const value = search.toLowerCase();

    return (
      patient.name.toLowerCase().includes(value) ||
      patient.dni.includes(value) ||
      patient.condition.toLowerCase().includes(value)
    );
  });

  const selected = patientOptions.find((patient) => patient.id === selectedId) || patientOptions[0];

  const history = useMemo(
    () =>
      selected.data.medicalHistory
        .filter((entry) => activeTab === 'Todos' || entry.type === activeTab)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [activeTab, selected]
  );

  const stats = [
    { label: 'Registros', value: selected.data.medicalHistory.length, icon: FileText, color: 'text-[#2563EB]', bg: 'bg-[#EEF2FF]' },
    { label: 'Consultas', value: selected.data.medicalHistory.filter((entry) => entry.type === 'Consulta').length, icon: MessageSquare, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
    { label: 'Prioridad alta', value: selected.data.medicalHistory.filter((entry) => entry.priority === 'Alta').length, icon: Activity, color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Historial Clínico</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <Card className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar paciente</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, DNI o condición..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar paciente</label>
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={(event) => setSelectedId(Number(event.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm bg-white appearance-none"
                >
                  {filteredPatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - DNI {patient.dni}
                    </option>
                  ))}
                </select>
                <ChevronRight size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
              <p className="text-sm text-gray-500">
                {selected.age} años · DNI {selected.dni} · {selected.bloodType}
              </p>
              <p className="text-sm text-gray-500">Alergias: {selected.allergies}</p>
            </div>
            <Badge variant="blue">{selected.condition}</Badge>
          </div>
        </Card>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {history.map((entry, index) => (
            <Card key={entry.id}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                  {index < history.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue-200"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <p className="text-sm font-semibold text-gray-900">{entry.date}</p>
                        <Badge variant={typeBadge[entry.type] || 'gray'}>{entry.type}</Badge>
                        <Badge variant={priorityBadge[entry.priority] || 'gray'}>Prioridad {entry.priority}</Badge>
                      </div>
                      <p className="text-base font-semibold text-gray-800">{entry.diagnosis}</p>
                      <p className="text-sm text-gray-500 mt-1">{entry.notes}</p>
                      <p className="text-xs text-gray-400 mt-2">Atendido por {entry.doctor}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedEntry(entry)}>
                      <Eye size={16} className="mr-1" /> Ver detalle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {history.length === 0 && (
            <Card>
              <div className="text-center py-10">
                <ClipboardList size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No hay registros para este filtro</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedEntry)}
        onClose={() => setSelectedEntry(null)}
        title="Detalle del historial"
        size="lg"
      >
        {selectedEntry && (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedEntry.diagnosis}</h2>
                <p className="text-sm text-gray-500">{selectedEntry.date} · {selectedEntry.doctor}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={typeBadge[selectedEntry.type] || 'gray'}>{selectedEntry.type}</Badge>
                <Badge variant={priorityBadge[selectedEntry.priority] || 'gray'}>{selectedEntry.priority}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailBlock icon={FileText} title="Notas clínicas" text={selectedEntry.notes} />
              <DetailBlock icon={Pill} title="Tratamiento" text={selectedEntry.treatment} />
              <DetailBlock icon={ClipboardList} title="Exámenes solicitados" text={selectedEntry.exams} />
              <DetailBlock icon={Activity} title="Prioridad" text={selectedEntry.priority} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function DetailBlock({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-[#2563EB]" />
        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default HistorialClinico;
