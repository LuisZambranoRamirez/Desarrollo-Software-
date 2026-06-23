import { doctorDashboardData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
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
  const consultations = doctorDashboardData.upcomingConsultations;

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

        {consultations.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No hay consultas programadas para hoy</p>
              <p className="text-gray-400 text-sm mt-1">Descansa, no tienes citas pendientes</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {consultations.map((c, i) => (
              <Card key={i}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#EEF2FF]">
                      <Clock size={24} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{c.time}</p>
                      <p className="text-sm text-gray-500">{c.patient}</p>
                      <p className="text-xs text-gray-400">{c.reason}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="primary" size="sm">Iniciar</Button>
                    <Button variant="warning" size="sm">Reprogramar</Button>
                    <Button variant="error" size="sm">Cancelar</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Agenda;
