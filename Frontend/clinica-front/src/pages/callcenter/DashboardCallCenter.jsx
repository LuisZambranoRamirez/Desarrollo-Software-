import { useState, useEffect } from 'react';
import { callCenterData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Table from '../../components/ui/Table.jsx';
import RealtimeStatus from '../../components/common/RealtimeStatus.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../services/api.js';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Headphones, Activity } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Médicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-callcenter/configuracion' },
];

const stats = [
  { label: 'Llamadas del día', value: callCenterData.dailyCalls, icon: Phone, bg: 'bg-blue-100', iconBg: 'bg-[#2563EB]', textColor: 'text-[#2563EB]' },
  { label: 'Operadores activos', value: callCenterData.activeOperators, icon: Headphones, bg: 'bg-green-100', iconBg: 'bg-[#10B981]', textColor: 'text-[#10B981]' },
  { label: 'Pacientes atendidos', value: callCenterData.patientsAttended, icon: Users, bg: 'bg-yellow-100', iconBg: 'bg-[#F59E0B]', textColor: 'text-[#F59E0B]' },
  { label: 'Citas generadas', value: callCenterData.appointmentsGenerated, icon: Calendar, bg: 'bg-purple-100', iconBg: 'bg-[#8B5CF6]', textColor: 'text-[#8B5CF6]' },
];

const historyColumns = [
  { key: 'time', label: 'Hora' },
  { key: 'patient', label: 'Paciente' },
  { key: 'reason', label: 'Motivo' },
  { key: 'operator', label: 'Operador' },
  { key: 'status', label: 'Estado', render: (value) => {
    const variants = { completada: 'green', pendiente: 'yellow', cancelada: 'red' };
    return <Badge variant={variants[value] || 'gray'} size="sm">{value}</Badge>;
  }},
];

function getStatusBadge(status) {
  const variants = { disponible: 'green', en_llamada: 'yellow', ocupado: 'red', desconectado: 'gray' };
  const labels = { disponible: 'Disponible', en_llamada: 'En llamada', ocupado: 'Ocupado', desconectado: 'Desconectado' };
  return <Badge variant={variants[status]} size="sm">{labels[status]}</Badge>;
}

function DashboardCallCenter() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getMe().then(setProfile).catch(() => {});
  }, []);

  const displayName = profile
    ? `${profile.nombre} ${profile.apellido}`
    : user
      ? `${user.nombre} ${user.apellido}`
      : 'Laura Mendoza';

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName={displayName} />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Call Center - Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Monitoreo general del centro de llamadas</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Estado de operadores</h2>
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {callCenterData.operators.map((op) => (
                <div key={op.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium text-gray-900">{op.name}</span>
                  {getStatusBadge(op.status)}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Actividad reciente</h2>
              <Activity size={20} className="text-gray-400" />
            </div>
            <Table columns={historyColumns} data={callCenterData.recentHistory} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardCallCenter;
