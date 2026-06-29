import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import { LayoutDashboard, Calendar, Users, ClipboardList, MessageSquare, BarChart3, User, Bell, Heart, Save, X } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard-medico' },
  { icon: Calendar, label: 'Agenda', path: '/dashboard-medico/agenda' },
  { icon: Users, label: 'Pacientes', path: '/dashboard-medico/pacientes' },
  { icon: ClipboardList, label: 'Historial clínico', path: '/dashboard-medico/historial' },
  { icon: MessageSquare, label: 'Consultas', path: '/dashboard-medico/consultas' },
  { icon: BarChart3, label: 'Reportes', path: '/dashboard-medico/reportes' },
  { icon: User, label: 'Perfil', path: '/dashboard-medico/perfil' },
];

const initialDoctorInfo = {
  name: 'Dr. Carlos Mendoza',
  type: 'Médico especialista',
  specialty: 'Cardiología',
  subspecialty: 'Cardiología clínica y prevención cardiovascular',
  experience: '18 años',
  email: 'carlos.mendoza@clinicasaludtotal.com',
  phone: '+51 999 888 777',
  license: 'CMP 45231',
  office: 'Consultorio 304 - Torre Médica',
  schedule: 'Lun - Vie, 8:00 AM - 2:00 PM',
  languages: 'Español, Inglés',
  bio: 'Especialista en diagnóstico, control y prevención de enfermedades cardiovasculares, con enfoque en atención integral del paciente adulto.',
};

const fieldLabels = {
  type: 'Tipo de médico',
  specialty: 'Especialidad',
  subspecialty: 'Subespecialidad',
  experience: 'Experiencia',
  email: 'Email',
  phone: 'Teléfono',
  license: 'Licencia',
  office: 'Consultorio',
  schedule: 'Horario de atención',
  languages: 'Idiomas',
};

function PerfilMedico() {
  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [draftInfo, setDraftInfo] = useState(initialDoctorInfo);
  const [isEditing, setIsEditing] = useState(false);

  const updateDraft = (field, value) => {
    setDraftInfo((current) => ({ ...current, [field]: value }));
  };

  const startEditing = () => {
    setDraftInfo(doctorInfo);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftInfo(doctorInfo);
    setIsEditing(false);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setDoctorInfo(draftInfo);
    setIsEditing(false);
  };

  const visibleInfo = isEditing ? draftInfo : doctorInfo;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar menuItems={menuItems} userRole="Médico" userName={doctorInfo.name} />
      <div className="flex-1 p-6 md:p-8 md:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={22} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={saveProfile}>
          <Card>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <img
                src="https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563EB&color=fff&size=200"
                alt={doctorInfo.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />

              <div className="flex-1 w-full">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="text-center md:text-left">
                    {isEditing ? (
                      <Input
                        label="Nombre"
                        value={draftInfo.name}
                        onChange={(event) => updateDraft('name', event.target.value)}
                        required
                      />
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900">{doctorInfo.name}</h2>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                          <Heart size={18} className="text-red-500" />
                          <span className="text-[#2563EB] font-medium">{doctorInfo.specialty}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-center md:justify-end gap-2">
                    {isEditing ? (
                      <>
                        <Button type="button" variant="ghost" onClick={cancelEditing}>
                          <X size={18} className="mr-2" /> Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                          <Save size={18} className="mr-2" /> Guardar
                        </Button>
                      </>
                    ) : (
                      <Button type="button" variant="primary" onClick={startEditing}>
                        <User size={18} className="mr-2" /> Editar Perfil
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  {Object.entries(fieldLabels).map(([field, label]) => (
                    <div key={field}>
                      {isEditing ? (
                        <Input
                          label={label}
                          value={draftInfo[field]}
                          onChange={(event) => updateDraft(field, event.target.value)}
                          required={field !== 'subspecialty'}
                        />
                      ) : (
                        <>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="text-base font-medium text-gray-900">{visibleInfo[field]}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-1">Perfil profesional</p>
                  {isEditing ? (
                    <textarea
                      value={draftInfo.bio}
                      onChange={(event) => updateDraft('bio', event.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                      required
                    />
                  ) : (
                    <p className="text-base leading-relaxed text-gray-900">{doctorInfo.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default PerfilMedico;
