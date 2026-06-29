import Sidebar from '../../components/layout/Sidebar.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Activity, Download } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Médicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-callcenter/configuracion' },
];

const reportStats = [
  { label: 'Llamadas totales del mes', value: '1,200', icon: Phone, bg: 'bg-blue-100', textColor: 'text-[#2563EB]' },
  { label: 'Citas generadas', value: '450', icon: Calendar, bg: 'bg-green-100', textColor: 'text-[#10B981]' },
  { label: 'Pacientes nuevos', value: '180', icon: Users, bg: 'bg-yellow-100', textColor: 'text-[#F59E0B]' },
  { label: 'Satisfacción', value: '96%', icon: Activity, bg: 'bg-purple-100', textColor: 'text-[#8B5CF6]' },
];

function ReportesCallCenter() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
            <p className="text-gray-500 text-sm mt-1">Estadísticas del call center</p>
          </div>
          <Button variant="primary" onClick={() => alert('Exportando datos...')}>
            <Download size={16} className="mr-2" /> Exportar datos
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportStats.map((stat) => {
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Llamadas por día</h2>
            <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <BarChart3 size={48} className="text-blue-300" />
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Citas generadas</h2>
            <div className="h-48 bg-gradient-to-r from-green-100 to-green-50 rounded-xl flex items-center justify-center">
              <Calendar size={48} className="text-green-300" />
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento de operadores</h2>
            <div className="h-48 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl flex items-center justify-center">
              <Users size={48} className="text-yellow-300" />
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Satisfacción del paciente</h2>
            <div className="h-48 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
              <Activity size={48} className="text-purple-300" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReportesCallCenter;
