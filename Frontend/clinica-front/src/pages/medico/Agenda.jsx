import { useMemo, useState } from 'react';
import { doctorDashboardData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
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
  Clock,
  Eye,
  PlayCircle,
  RefreshCw,
  XCircle,
  CheckCircle,
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

const today = new Date().toLocaleDateString('es-ES', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const initialDetails = [
  { type: 'Presencial', office: 'Consultorio 304', age: 45, phone: '+51 999 888 777', priority: 'Alta', notes: 'Controlar presión arterial y revisar adherencia al tratamiento.' },
  { type: 'Presencial', office: 'Consultorio 302', age: 32, phone: '+51 988 777 666', priority: 'Normal', notes: 'Consulta de seguimiento preventivo.' },
  { type: 'Virtual', office: 'Teleconsulta', age: 55, phone: '+51 977 666 555', priority: 'Alta', notes: 'Revisar resultados recientes y ajustar indicaciones.' },
  { type: 'Presencial', office: 'Consultorio 205', age: 28, phone: '+51 966 555 444', priority: 'Normal', notes: 'Evaluar evolución de tratamiento dermatológico.' },
];

const tabs = [
  { label: 'Todas', value: 'todas' },
  { label: 'Programadas', value: 'programada' },
  { label: 'En curso', value: 'en_curso' },
  { label: 'Reprogramadas', value: 'reprogramada' },
  { label: 'Canceladas', value: 'cancelada' },
];

const statusConfig = {
  programada: { label: 'Programada', badge: 'blue', icon: Clock },
  en_curso: { label: 'En curso', badge: 'green', icon: PlayCircle },
  reprogramada: { label: 'Reprogramada', badge: 'yellow', icon: RefreshCw },
  cancelada: { label: 'Cancelada', badge: 'red', icon: XCircle },
};

const priorityBadge = {
  Alta: 'red',
  Normal: 'green',
};

function Agenda() {
  const { user } = useAuth();
  const [consultations, setConsultations] = useState(
    doctorDashboardData.upcomingConsultations.map((consultation, index) => ({
      ...consultation,
      ...initialDetails[index],
      id: index + 1,
      status: 'programada',
      originalTime: consultation.time,
    }))
  );
  const [activeTab, setActiveTab] = useState('todas');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ time: '', reason: '' });

  const sortedConsultations = useMemo(
    () => [...consultations].sort((a, b) => a.time.localeCompare(b.time)),
    [consultations]
  );

  const filteredConsultations = sortedConsultations.filter((consultation) =>
    activeTab === 'todas' ? true : consultation.status === activeTab
  );

  const stats = [
    { label: 'Consultas hoy', value: consultations.length, icon: Calendar, color: 'text-[#2563EB]', bg: 'bg-[#EEF2FF]' },
    { label: 'Pendientes', value: consultations.filter((c) => c.status === 'programada' || c.status === 'reprogramada').length, icon: Clock, color: 'text-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
    { label: 'En curso', value: consultations.filter((c) => c.status === 'en_curso').length, icon: PlayCircle, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
    { label: 'Canceladas', value: consultations.filter((c) => c.status === 'cancelada').length, icon: XCircle, color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]' },
  ];

  const handleStart = (consultationId) => {
    setConsultations((current) =>
      current.map((consultation) =>
        consultation.id === consultationId
          ? { ...consultation, status: 'en_curso' }
          : consultation
      )
    );
  };

  const openDetailModal = (consultation) => {
    setSelectedConsultation({ ...consultation, action: 'detail' });
  };

  const openRescheduleModal = (consultation) => {
    setSelectedConsultation({ ...consultation, action: 'reschedule' });
    setRescheduleData({ time: consultation.time, reason: consultation.reason });
  };

  const handleReschedule = (event) => {
    event.preventDefault();

    setConsultations((current) =>
      current.map((consultation) =>
        consultation.id === selectedConsultation.id
          ? {
              ...consultation,
              time: rescheduleData.time,
              reason: rescheduleData.reason,
              status: 'reprogramada',
            }
          : consultation
      )
    );
    setSelectedConsultation(null);
  };

  const openCancelModal = (consultation) => {
    setSelectedConsultation({ ...consultation, action: 'cancel' });
  };

  const handleCancel = () => {
    setConsultations((current) =>
      current.map((consultation) =>
        consultation.id === selectedConsultation.id
          ? { ...consultation, status: 'cancelada' }
          : consultation
      )
    );
    setSelectedConsultation(null);
  };

  const closeModal = () => {
    setSelectedConsultation(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName={user ? `Dr. ${user.nombre} ${user.apellido}` : 'Médico'} />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mi Agenda</h1>
            <p className="text-gray-500 text-sm mt-1 capitalize">{today}</p>
          </div>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredConsultations.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No hay consultas en esta categoría</p>
              <p className="text-gray-400 text-sm mt-1">Prueba seleccionando otro filtro de agenda</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onStart={handleStart}
                onDetail={openDetailModal}
                onReschedule={openRescheduleModal}
                onCancel={openCancelModal}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={selectedConsultation?.action === 'detail'}
        onClose={closeModal}
        title="Detalle de consulta"
        size="lg"
      >
        {selectedConsultation && <ConsultationDetail consultation={selectedConsultation} />}
      </Modal>

      <Modal
        isOpen={selectedConsultation?.action === 'reschedule'}
        onClose={closeModal}
        title="Reprogramar consulta"
      >
        <form onSubmit={handleReschedule} className="space-y-4">
          <Input
            label="Hora"
            type="time"
            value={rescheduleData.time}
            onChange={(event) => setRescheduleData((current) => ({ ...current, time: event.target.value }))}
            required
          />
          <Input
            label="Motivo"
            value={rescheduleData.reason}
            onChange={(event) => setRescheduleData((current) => ({ ...current, reason: event.target.value }))}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cerrar
            </Button>
            <Button type="submit" variant="primary">
              Guardar cambios
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={selectedConsultation?.action === 'cancel'}
        onClose={closeModal}
        title="Cancelar consulta"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            ¿Deseas cancelar la consulta de {selectedConsultation?.patient} a las {selectedConsultation?.time}?
          </p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Volver
            </Button>
            <Button type="button" variant="error" onClick={handleCancel}>
              Cancelar consulta
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ConsultationCard({ consultation, onStart, onDetail, onReschedule, onCancel }) {
  const status = statusConfig[consultation.status] || statusConfig.programada;
  const StatusIcon = status.icon;
  const isInProgress = consultation.status === 'en_curso';
  const isCanceled = consultation.status === 'cancelada';

  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isInProgress ? 'bg-[#ECFDF5]' : 'bg-[#EEF2FF]'}`}>
            <StatusIcon size={24} className={isInProgress ? 'text-[#10B981]' : 'text-[#2563EB]'} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-lg font-semibold text-gray-900">{consultation.time}</p>
              <Badge variant={status.badge}>{status.label}</Badge>
              <Badge variant={priorityBadge[consultation.priority] || 'gray'}>{consultation.priority}</Badge>
            </div>
            <p className="text-sm text-gray-500">{consultation.patient}</p>
            <p className="text-xs text-gray-400">{consultation.reason}</p>
            <p className="text-xs text-gray-400 mt-1">{consultation.type} · {consultation.office}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <Button variant="ghost" size="sm" onClick={() => onDetail(consultation)}>
            <Eye size={16} className="mr-1" /> Ver
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onStart(consultation.id)}
            disabled={isInProgress || isCanceled}
          >
            {isInProgress ? 'Iniciada' : 'Iniciar'}
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => onReschedule(consultation)}
            disabled={isCanceled}
          >
            Reprogramar
          </Button>
          <Button
            variant="error"
            size="sm"
            onClick={() => onCancel(consultation)}
            disabled={isCanceled}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ConsultationDetail({ consultation }) {
  const status = statusConfig[consultation.status] || statusConfig.programada;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{consultation.patient}</h2>
          <p className="text-sm text-gray-500">{consultation.age} años · {consultation.phone}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={status.badge}>{status.label}</Badge>
          <Badge variant={priorityBadge[consultation.priority] || 'gray'}>{consultation.priority}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem label="Hora actual" value={consultation.time} />
        <DetailItem label="Hora original" value={consultation.originalTime} />
        <DetailItem label="Tipo de atención" value={consultation.type} />
        <DetailItem label="Ubicación" value={consultation.office} />
        <DetailItem label="Motivo" value={consultation.reason} />
        <DetailItem label="Estado" value={status.label} />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle size={18} className="text-[#10B981]" />
          <p className="text-sm font-semibold text-gray-900">Notas para la consulta</p>
        </div>
        <p className="text-sm text-gray-600">{consultation.notes}</p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl bg-[#F8FAFC] p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

export default Agenda;
