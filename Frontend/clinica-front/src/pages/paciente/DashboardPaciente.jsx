import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings, Bell, ChevronRight, Activity, Heart } from 'lucide-react';
import { patientData, appointments } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import AppointmentCard from '../../components/cards/AppointmentCard';
import Card from '../../components/ui/Card';
import RealtimeStatus from '../../components/common/RealtimeStatus.jsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-paciente' },
  { icon: Calendar, label: 'Mis citas', path: '/dashboard-paciente/citas' },
  { icon: ClipboardList, label: 'Historial médico', path: '/dashboard-paciente/historial' },
  { icon: FlaskConical, label: 'Resultados', path: '/dashboard-paciente/resultados' },
  { icon: User, label: 'Perfil', path: '/dashboard-paciente/perfil' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-paciente/configuracion' },
];

function DashboardPaciente() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const patientAppointments = appointments.filter(a => a.patient === patientData.name);

  const stats = [
    { icon: Calendar, label: 'Próxima Cita', value: `${patientData.nextAppointment.date} ${patientData.nextAppointment.time}`, color: 'text-[#2563EB]', bg: 'bg-[#EEF2FF]' },
    { icon: Activity, label: 'Especialidad', value: patientData.nextAppointment.specialty, color: 'text-[#10B981]', bg: 'bg-[#ECFDF5]' },
    { icon: Heart, label: 'Médico Asignado', value: patientData.nextAppointment.doctor, color: 'text-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
    { icon: Bell, label: 'Recordatorios', value: patientData.reminders.length.toString(), color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName={patientData.name} />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937]">Bienvenido, {patientData.name}</h1>
            <p className="text-[#6B7280] mt-1 capitalize">{dateStr}</p>
          </div>
          <RealtimeStatus />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div>
                  <p className="text-sm text-[#6B7280]">{stat.label}</p>
                  <p className="text-lg font-semibold text-[#1F2937]">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1F2937]">Próximas citas</h2>
              <Link to="/dashboard-paciente/citas" className="text-sm text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1">
                Ver todas <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {patientAppointments.length > 0 ? (
                patientAppointments.map(app => (
                  <AppointmentCard key={app.id} appointment={{ ...app, especialidad: app.specialty }} />
                ))
              ) : (
                <p className="text-[#9CA3AF] text-sm py-4 text-center">No tienes citas próximas</p>
              )}
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Recordatorios</h2>
            <div className="space-y-3">
              {patientData.reminders.map(r => (
                <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                  <Bell size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#1F2937]">{r.text}</p>
                    <p className="text-xs text-[#6B7280]">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPaciente;
