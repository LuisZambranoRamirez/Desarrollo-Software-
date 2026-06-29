import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import { LayoutDashboard, Phone, Users, Calendar, Stethoscope, BarChart3, Settings, Headphones, Clock, AlertCircle } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-callcenter' },
  { icon: Phone, label: 'Central de llamadas', path: '/dashboard-callcenter/llamadas' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-callcenter/pacientes' },
  { icon: Calendar, label: 'Citas', path: '/dashboard-callcenter/citas' },
  { icon: Stethoscope, label: 'Médicos', path: '/dashboard-callcenter/medicos' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-callcenter/reportes' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-callcenter/configuracion' },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-[#2563EB]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function ConfiguracionCallCenter() {
  const [recording, setRecording] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [callLimit, setCallLimit] = useState(50);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Call Center" userName="Laura Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-500 text-sm mt-1">Ajustes del call center</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Clock size={20} className="text-[#2563EB]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Horario de operación</h2>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Lun - Vie</span>
                <span>8:00 - 20:00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium">Sábado</span>
                <span>9:00 - 14:00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Domingo</span>
                <span className="text-gray-400">Cerrado</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Headphones size={20} className="text-[#10B981]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Grabación de llamadas</h2>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Grabar todas las llamadas entrantes y salientes</p>
              <Toggle enabled={recording} onChange={() => setRecording(!recording)} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertCircle size={20} className="text-[#F59E0B]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Notificaciones</h2>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Recibir notificaciones de nuevas llamadas</p>
              <Toggle enabled={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-100">
                <Phone size={20} className="text-[#8B5CF6]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Límite de llamadas por operador</h2>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={callLimit}
                onChange={(e) => setCallLimit(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-200 rounded-xl text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
              <span className="text-sm text-gray-600">llamadas por día</span>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={() => alert('Configuración guardada')}>
            Guardar configuración
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfiguracionCallCenter;
