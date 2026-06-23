import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Heart } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const doctorInfo = {
  name: 'Dr. Carlos Mendoza',
  specialty: 'Cardiología',
  experience: '18 años',
  email: 'carlos.mendoza@clinicasaludtotal.com',
  phone: '+51 999 888 777',
  license: 'CMP 45231',
};

function PerfilMedico() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <Card>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img
              src="https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563EB&color=fff&size=200"
              alt="Dr. Carlos Mendoza"
              className="w-32 h-32 rounded-2xl object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{doctorInfo.name}</h2>
              <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                <Heart size={18} className="text-red-500" />
                <span className="text-[#2563EB] font-medium">{doctorInfo.specialty}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">Experiencia</p>
                  <p className="text-base font-medium text-gray-900">{doctorInfo.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-900">{doctorInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="text-base font-medium text-gray-900">{doctorInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Licencia</p>
                  <p className="text-base font-medium text-gray-900">{doctorInfo.license}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center md:justify-start">
                <Button variant="primary">
                  <User size={18} className="mr-2" /> Editar Perfil
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PerfilMedico;
