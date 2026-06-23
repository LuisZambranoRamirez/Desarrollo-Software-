import { useState } from 'react';
import { patientData } from '../../data/mockData';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, ChevronRight } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const patientOptions = [
  { id: 1, name: 'Juan Pérez', data: patientData },
  {
    id: 2,
    name: 'María López',
    data: {
      ...patientData,
      name: 'María López',
      medicalHistory: [
        { date: '2026-05-10', diagnosis: 'Control ginecológico', doctor: 'Dra. Patricia Ruiz', notes: 'Examen de rutina sin hallazgos.' },
        { date: '2026-02-18', diagnosis: 'Infección urinaria', doctor: 'Dr. Luis García', notes: 'Tratamiento con antibióticos completado.' },
      ],
    },
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    data: {
      ...patientData,
      name: 'Carlos Ruiz',
      medicalHistory: [
        { date: '2026-04-22', diagnosis: 'Diabetes tipo 2', doctor: 'Dr. Carlos Mendoza', notes: 'Control de glucosa. Ajuste de metformina.' },
        { date: '2025-11-15', diagnosis: 'Hipercolesterolemia', doctor: 'Dr. Carlos Mendoza', notes: 'Dieta y estatinas prescritas.' },
        { date: '2025-07-30', diagnosis: 'Control general', doctor: 'Dr. Roberto Sánchez', notes: 'Paciente en buen estado general.' },
      ],
    },
  },
];

function HistorialClinico() {
  const [selectedId, setSelectedId] = useState(patientOptions[0].id);

  const selected = patientOptions.find((p) => p.id === selectedId);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName="Dr. Carlos Mendoza" />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Historial Clínico</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <Card className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar paciente</label>
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm bg-white appearance-none"
            >
              {patientOptions.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronRight size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
          </div>
        </Card>

        <div className="space-y-4">
          {selected.data.medicalHistory.map((entry, i) => (
            <Card key={i}>
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#2563EB]"></div>
                  {i < selected.data.medicalHistory.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">{entry.date}</p>
                    <Badge variant="blue">{entry.doctor}</Badge>
                  </div>
                  <p className="text-base font-medium text-gray-800">{entry.diagnosis}</p>
                  <p className="text-sm text-gray-500 mt-1">{entry.notes}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HistorialClinico;
