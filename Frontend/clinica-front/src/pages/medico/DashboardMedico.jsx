import { doctorDashboardData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Table from '../../components/ui/Table.jsx';
import RealtimeStatus from '../../components/common/RealtimeStatus.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Clock, AlertCircle, ChevronRight, Heart } from 'lucide-react';

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

const stats = [
  { label: 'Pacientes del día', value: doctorDashboardData.patientsToday, icon: Users, bg: 'bg-blue-100', iconBg: 'bg-[#2563EB]', textColor: 'text-[#2563EB]' },
  { label: 'Próximas consultas', value: doctorDashboardData.upcomingConsultations.length, icon: Clock, bg: 'bg-green-100', iconBg: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
  { label: 'Citas pendientes', value: doctorDashboardData.pendingAppointments, icon: AlertCircle, bg: 'bg-yellow-100', iconBg: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
  { label: 'Total pacientes', value: doctorDashboardData.statistics.totalPatients, icon: Heart, bg: 'bg-purple-100', iconBg: 'bg-[#8B5CF6]', textColor: 'text-[#8B5CF6]' },
];

const patientColumns = [
  { key: 'name', label: 'Paciente' },
  { key: 'age', label: 'Edad' },
  { key: 'condition', label: 'Condición' },
];

function DashboardMedico() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Médico</h1>
            <p className="text-gray-500 text-sm mt-1 capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <RealtimeStatus />
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={22} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon size={24} className={stat.textColor} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Próximas consultas</h2>
              <Clock size={20} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {doctorDashboardData.upcomingConsultations.map((c, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                    {i < doctorDashboardData.upcomingConsultations.length - 1 && (
                      <div className="w-0.5 h-12 bg-blue-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium text-gray-900">{c.patient}</p>
                    <p className="text-xs text-gray-500">{c.time} - {c.reason}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-1" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Pacientes del día</h2>
              <Users size={20} className="text-gray-400" />
            </div>
            <Table
              columns={patientColumns}
              data={doctorDashboardData.patients.slice(0, 4)}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardMedico;
