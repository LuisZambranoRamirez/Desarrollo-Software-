import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Download } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const reportStats = [
  { label: 'Consultas este mes', value: '112', icon: ClipboardList, bg: 'bg-blue-100', iconBg: 'bg-[#2563EB]', color: 'text-[#2563EB]' },
  { label: 'Pacientes nuevos', value: '28', icon: Users, bg: 'bg-green-100', iconBg: 'bg-[#10B981]', color: 'text-[#10B981]' },
  { label: 'Ingresos estimados', value: 'S/ 45,200', icon: BarChart3, bg: 'bg-purple-100', iconBg: 'bg-[#8B5CF6]', color: 'text-[#8B5CF6]' },
];

function ReportesMedico() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon size={24} className={stat.color} />
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultas por mes</h2>
            <div className="h-48 flex items-end space-x-3">
              {[40, 55, 45, 70, 60, 80, 65, 75, 90, 85, 95, 112].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-lg bg-[#2563EB] transition-all duration-300 hover:bg-[#1D4ED8]"
                    style={{ height: `${(h / 112) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2">
                    {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Especialidades más consultadas</h2>
            <div className="space-y-4">
              {[
                { name: 'Cardiología', percent: 85 },
                { name: 'Pediatría', percent: 70 },
                { name: 'Traumatología', percent: 55 },
                { name: 'Dermatología', percent: 40 },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.name}</span>
                    <span className="text-gray-500">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full rounded-full bg-[#10B981] transition-all"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" onClick={() => alert('Reporte generado correctamente')}>
            <Download size={18} className="mr-2" /> Generar reporte
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportesMedico;
