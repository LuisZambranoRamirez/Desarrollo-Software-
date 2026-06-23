import { useState } from 'react';
import { appointments } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Table from '../../components/ui/Table.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Médicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-callcenter/configuracion' },
];

const tabs = [
  { key: 'todas', label: 'Todas' },
  { key: 'confirmada', label: 'Confirmadas' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'completada', label: 'Completadas' },
  { key: 'cancelada', label: 'Canceladas' },
];

const columns = [
  { key: 'patient', label: 'Paciente' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'specialty', label: 'Especialidad' },
  { key: 'date', label: 'Fecha' },
  { key: 'time', label: 'Hora' },
  { key: 'status', label: 'Estado', render: (value) => {
    const variants = { confirmada: 'green', pendiente: 'yellow', completada: 'blue', cancelada: 'red' };
    return <Badge variant={variants[value] || 'gray'} size="sm">{value}</Badge>;
  }},
];

function CitasCallCenter() {
  const [activeTab, setActiveTab] = useState('todas');
  const filtered = activeTab === 'todas' ? appointments : appointments.filter((a) => a.status === activeTab);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-500 text-sm mt-1">Administración de citas médicas</p>
        </div>

        <Card>
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Table columns={columns} data={filtered} />
        </Card>
      </div>
    </div>
  );
}

export default CitasCallCenter;
