import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings, FileText } from 'lucide-react';
import { patientData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-paciente' },
  { icon: Calendar, label: 'Mis citas', path: '/dashboard-paciente/citas' },
  { icon: ClipboardList, label: 'Historial médico', path: '/dashboard-paciente/historial' },
  { icon: FlaskConical, label: 'Resultados', path: '/dashboard-paciente/resultados' },
  { icon: User, label: 'Perfil', path: '/dashboard-paciente/perfil' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-paciente/configuracion' },
];

function HistorialMedico() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName={patientData.name} />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Historial Médico</h1>
        <div className="space-y-4">
          {patientData.medicalHistory.map((entry, i) => (
            <Card key={i}>
              <div className="flex gap-4">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                    <FileText size={20} className="text-[#2563EB]" />
                  </div>
                  {i < patientData.medicalHistory.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#E5E7EB] mt-2" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-[#6B7280] flex items-center gap-1">
                      <Calendar size={14} />
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F2937]">{entry.diagnosis}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-[#6B7280]">
                    <User size={14} />
                    <span>{entry.doctor}</span>
                  </div>
                  {entry.notes && (
                    <p className="mt-2 text-sm text-[#6B7280] bg-[#F9FAFB] p-3 rounded-xl">{entry.notes}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistorialMedico;
