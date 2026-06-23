import { useState } from 'react';
import { LayoutDashboard, Calendar, ClipboardList, FlaskConical, User, Settings, Bell } from 'lucide-react';
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

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#2563EB]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function ConfiguracionPaciente() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    resultsAvailable: true,
    shareData: false,
    twoFactorAuth: false,
    language: 'es',
    timeFormat: '24h',
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Paciente" userName={patientData.name} />
      <div className="flex-1 md:ml-64 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-6">Configuración</h1>
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-[#2563EB]" />
              <h2 className="text-lg font-semibold text-[#1F2937]">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Notificaciones por email</p>
                  <p className="text-sm text-[#6B7280]">Recibe alertas en tu correo electrónico</p>
                </div>
                <Toggle enabled={settings.emailNotifications} onChange={() => toggle('emailNotifications')} />
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Notificaciones SMS</p>
                  <p className="text-sm text-[#6B7280]">Recibe mensajes de texto</p>
                </div>
                <Toggle enabled={settings.smsNotifications} onChange={() => toggle('smsNotifications')} />
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Recordatorios de citas</p>
                  <p className="text-sm text-[#6B7280]">Te avisamos antes de tu cita</p>
                </div>
                <Toggle enabled={settings.appointmentReminders} onChange={() => toggle('appointmentReminders')} />
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Resultados disponibles</p>
                  <p className="text-sm text-[#6B7280]">Notificación cuando tus resultados estén listos</p>
                </div>
                <Toggle enabled={settings.resultsAvailable} onChange={() => toggle('resultsAvailable')} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Settings size={20} className="text-[#2563EB]" />
              <h2 className="text-lg font-semibold text-[#1F2937]">Privacidad</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Compartir datos con especialistas</p>
                  <p className="text-sm text-[#6B7280]">Permite que otros médicos accedan a tu historial</p>
                </div>
                <Toggle enabled={settings.shareData} onChange={() => toggle('shareData')} />
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Autenticación de dos pasos</p>
                  <p className="text-sm text-[#6B7280]">Protege tu cuenta con verificación adicional</p>
                </div>
                <Toggle enabled={settings.twoFactorAuth} onChange={() => toggle('twoFactorAuth')} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Settings size={20} className="text-[#2563EB]" />
              <h2 className="text-lg font-semibold text-[#1F2937]">Preferencias</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Idioma</p>
                  <p className="text-sm text-[#6B7280]">Español</p>
                </div>
                <span className="text-sm text-[#6B7280]">ES</span>
              </div>
              <div className="border-t border-[#E5E7EB]" />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-[#1F2937]">Formato de hora</p>
                  <p className="text-sm text-[#6B7280]">Formato de 24 horas</p>
                </div>
                <span className="text-sm text-[#6B7280]">24h</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ConfiguracionPaciente;
