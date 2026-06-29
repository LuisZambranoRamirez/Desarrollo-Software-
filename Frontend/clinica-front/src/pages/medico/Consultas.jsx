import { useState } from 'react';
import { appointments } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const tabs = ['Todas', 'Pendientes', 'Completadas', 'Canceladas'];

const statusBadge = {
  confirmada: { variant: 'green', label: 'Confirmada' },
  pendiente: { variant: 'yellow', label: 'Pendiente' },
  completada: { variant: 'blue', label: 'Completada' },
  cancelada: { variant: 'red', label: 'Cancelada' },
};

const statusIcon = {
  confirmada: CheckCircle,
  pendiente: Clock,
  completada: CheckCircle,
  cancelada: XCircle,
};

const statusFilter = {
  Todas: () => true,
  Pendientes: (a) => a.status === 'pendiente',
  Completadas: (a) => a.status === 'completada',
  Canceladas: (a) => a.status === 'cancelada',
};

function Consultas() {
  const [activeTab, setActiveTab] = useState('Todas');

  const filtered = appointments.filter(statusFilter[activeTab]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Consultas Médicas</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <div className="flex space-x-2 mb-6 overflow-x-auto">
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
          {filtered.map((a) => {
            const Icon = statusIcon[a.status] || AlertCircle;
            const badge = statusBadge[a.status] || { variant: 'gray', label: a.status };
            return (
              <Card key={a.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-[#F8FAFC]">
                      <Icon size={24} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">{a.patient}</p>
                      <p className="text-sm text-gray-500">{a.doctor}</p>
                      <p className="text-xs text-gray-400">{a.date} - {a.time}</p>
                    </div>
                  </div>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <Card>
              <div className="text-center py-8">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No hay consultas en esta categoría</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Consultas;
