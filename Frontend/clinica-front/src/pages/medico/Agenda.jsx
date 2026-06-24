import { useState } from 'react';
import { doctorDashboardData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Clock } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

function Agenda() {
  const [consultations, setConsultations] = useState(
    doctorDashboardData.upcomingConsultations.map((consultation, index) => ({
      ...consultation,
      id: index + 1,
      status: 'programada',
    }))
  );
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ time: '', reason: '' });

  const visibleConsultations = consultations.filter((consultation) => consultation.status !== 'cancelada');

  const handleStart = (consultationId) => {
    setConsultations((current) =>
      current.map((consultation) =>
        consultation.id === consultationId
          ? { ...consultation, status: 'en_curso' }
          : consultation
      )
    );
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
              status: 'programada',
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
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
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

        {visibleConsultations.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No hay consultas programadas para hoy</p>
              <p className="text-gray-400 text-sm mt-1">Descansa, no tienes citas pendientes</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {visibleConsultations.map((c) => {
              const isInProgress = c.status === 'en_curso';

              return (
              <Card key={c.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${isInProgress ? 'bg-[#ECFDF5]' : 'bg-[#EEF2FF]'}`}>
                      <Clock size={24} className={isInProgress ? 'text-[#10B981]' : 'text-[#2563EB]'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-900">{c.time}</p>
                        {isInProgress && (
                          <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-xs font-medium text-[#047857]">
                            En curso
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{c.patient}</p>
                      <p className="text-xs text-gray-400">{c.reason}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStart(c.id)}
                      disabled={isInProgress}
                    >
                      {isInProgress ? 'Iniciada' : 'Iniciar'}
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openRescheduleModal(c)}
                    >
                      Reprogramar
                    </Button>
                    <Button
                      variant="error"
                      size="sm"
                      onClick={() => openCancelModal(c)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
              );
            })}
          </div>
        )}
      </div>

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

export default Agenda;
