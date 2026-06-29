import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings, Download, Eye } from 'lucide-react';
import { patientData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-paciente' },
  { icon: Calendar, label: 'Mis citas', path: '/dashboard-paciente/citas' },
  { icon: ClipboardList, label: 'Historial médico', path: '/dashboard-paciente/historial' },
  { icon: FlaskConical, label: 'Resultados', path: '/dashboard-paciente/resultados' },
  { icon: User, label: 'Perfil', path: '/dashboard-paciente/perfil' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-paciente/configuracion' },
];

const statusConfig = {
  disponible: { variant: 'green', label: 'Disponible' },
  pendiente: { variant: 'yellow', label: 'Pendiente' },
};

function Resultados() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName={patientData.name} />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Resultados de Exámenes</h1>
        <div className="space-y-3">
          {patientData.results.map(result => {
            const status = statusConfig[result.status] || { variant: 'gray', label: result.status };
            return (
              <Card key={result.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#EEF2FF]">
                      <FlaskConical size={24} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">{result.name}</p>
                      <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-0.5">
                        <Calendar size={14} />
                        {result.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={status.variant} size="sm">{status.label}</Badge>
                    {result.file ? (
                      <button className="p-2 rounded-xl bg-[#EEF2FF] text-[#2563EB] hover:bg-[#DBE4FF] transition-colors">
                        <Download size={18} />
                      </button>
                    ) : (
                      <button className="p-2 rounded-xl bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed">
                        <Eye size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Resultados;
