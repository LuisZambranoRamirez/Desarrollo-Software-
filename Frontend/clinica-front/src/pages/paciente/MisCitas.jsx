import { useState } from 'react';
import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings } from 'lucide-react';
import { appointments } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar';
import AppointmentCard from '../../components/cards/AppointmentCard';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-paciente' },
  { icon: Calendar, label: 'Mis citas', path: '/dashboard-paciente/citas' },
  { icon: ClipboardList, label: 'Historial médico', path: '/dashboard-paciente/historial' },
  { icon: FlaskConical, label: 'Resultados', path: '/dashboard-paciente/resultados' },
  { icon: User, label: 'Perfil', path: '/dashboard-paciente/perfil' },
  { icon: Settings, label: 'Configuración', path: '/dashboard-paciente/configuracion' },
];

const tabs = ['Todas', 'Confirmadas', 'Pendientes', 'Completadas', 'Canceladas'];

function MisCitas() {
  const [filter, setFilter] = useState('Todas');
  const filtered = filter === 'Todas'
    ? appointments
    : appointments.filter(a => a.status === filter.toLowerCase());

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName="Juan Pérez" />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Mis Citas</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === tab
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-[#6B7280] hover:bg-[#F3F4F6] border border-[#E5E7EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map(app => (
              <AppointmentCard key={app.id} appointment={{ ...app, especialidad: app.specialty }} variant="paciente" />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-[#D1D5DB] mb-3" />
              <p className="text-[#9CA3AF]">No hay citas {filter.toLowerCase()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MisCitas;
