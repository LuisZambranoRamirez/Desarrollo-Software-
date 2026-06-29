import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings } from 'lucide-react';
import { patientData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-paciente' },
  { icon: Calendar, label: 'Mis citas', path: '/dashboard-paciente/citas' },
  { icon: ClipboardList, label: 'Historial médico', path: '/dashboard-paciente/historial' },
  { icon: FlaskConical, label: 'Resultados', path: '/dashboard-paciente/resultados' },
  { icon: User, label: 'Perfil', path: '/dashboard-paciente/perfil' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-paciente/configuracion' },
];

function PerfilPaciente() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName={patientData.name} />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Mi Perfil</h1>
        <Card>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patientData.name)}&background=2563EB&color=fff&bold=true&size=120`}
              alt={patientData.name}
              className="w-28 h-28 rounded-full border-4 border-[#EEF2FF]"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#1F2937]">{patientData.name}</h2>
                  <p className="text-sm text-[#6B7280]">{patientData.email}</p>
                </div>
                <Button variant="outline" size="sm">Editar Perfil</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-3 rounded-xl bg-[#F9FAFB]">
                  <p className="text-xs text-[#6B7280]">Teléfono</p>
                  <p className="text-sm font-medium text-[#1F2937]">{patientData.phone}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB]">
                  <p className="text-xs text-[#6B7280]">DNI</p>
                  <p className="text-sm font-medium text-[#1F2937]">{patientData.dni}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB]">
                  <p className="text-xs text-[#6B7280]">Fecha de Nacimiento</p>
                  <p className="text-sm font-medium text-[#1F2937]">{patientData.birthDate}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F9FAFB]">
                  <p className="text-xs text-[#6B7280]">Tipo de Sangre</p>
                  <p className="text-sm font-medium text-[#1F2937]">{patientData.bloodType}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-[#6B7280] mb-2">Alergias</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.length > 0 ? (
                    patientData.allergies.map((a, i) => (
                      <Badge key={i} variant="red" size="sm">{a}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-[#9CA3AF]">No registra alergias</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PerfilPaciente;
