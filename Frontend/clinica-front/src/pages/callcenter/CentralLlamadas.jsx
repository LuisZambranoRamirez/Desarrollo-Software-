import { callCenterData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Table from '../../components/ui/Table.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Headphones, Clock, PhoneCall } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Médicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-callcenter/configuracion' },
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

function getStatusColor(status) {
  const colors = { disponible: 'border-l-green-500', en_llamada: 'border-l-yellow-500', ocupado: 'border-l-red-500', desconectado: 'border-l-gray-400' };
  return colors[status] || 'border-l-gray-400';
}

function CentralLlamadas() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Central de Llamadas</h1>
          <p className="text-gray-500 text-sm mt-1">Gestión de llamadas entrantes y salientes</p>
        </div>

        <div className="mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Llamadas Activas</h2>
              <PhoneCall size={20} className="text-green-500" />
            </div>
            {callCenterData.activeCalls.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No hay llamadas activas</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {callCenterData.activeCalls.map((call) => (
                  <div key={call.id} className="border border-gray-200 rounded-xl p-4 bg-green-50/30">
                    <div className="flex items-center space-x-2 mb-3">
                      <PhoneCall size={16} className="text-green-600" />
                      <span className="text-sm font-semibold text-gray-900">{call.patient}</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Operador:</span> {call.operator}</p>
                      <p><span className="font-medium">Duración:</span> {call.time} min</p>
                      <p><span className="font-medium">Motivo:</span> {call.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Historial Reciente</h2>
              <Clock size={20} className="text-gray-400" />
            </div>
            <Table columns={historyColumns} data={callCenterData.recentHistory} />
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Estado de Operadores</h2>
              <Headphones size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {callCenterData.operators.map((op) => (
                <div key={op.id} className={`border-l-4 ${getStatusColor(op.status)} bg-white rounded-lg p-3 border border-gray-200`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{op.name}</p>
                    {getStatusBadge(op.status)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{op.calls} llamadas gestionadas</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CentralLlamadas;
