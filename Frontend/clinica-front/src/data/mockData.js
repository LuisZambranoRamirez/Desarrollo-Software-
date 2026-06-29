export const specialties = [
  { id: 1, name: 'Cardiología', description: 'Diagnóstico y tratamiento de enfermedades del corazón y el sistema cardiovascular.', icon: 'Heart' },
  { id: 2, name: 'Cirugía De Cabeza, Cuello Y Maxilofacial', description: 'Cirugía reconstructiva y estética de cabeza, cuello y región maxilofacial.', icon: 'Brain' },
  { id: 3, name: 'Cirugía General', description: 'Procedimientos quirúrgicos del abdomen, digestivo y tejidos blandos.', icon: 'Stethoscope' },
  { id: 4, name: 'Dermatología', description: 'Prevención, diagnóstico y tratamiento de enfermedades de la piel.', icon: 'Eye' },
  { id: 5, name: 'Endocrinología', description: 'Trastornos hormonales y metabólicos del organismo.', icon: 'Activity' },
  { id: 6, name: 'Gastroenterología', description: 'Enfermedades del aparato digestivo y órganos relacionados.', icon: 'Heart' },
  { id: 7, name: 'Geriatría', description: 'Atención integral de la salud en adultos mayores.', icon: 'Heart' },
  { id: 8, name: 'Ginecología', description: 'Salud del sistema reproductor femenino.', icon: 'Heart' },
  { id: 9, name: 'Hematología', description: 'Estudio y tratamiento de enfermedades de la sangre.', icon: 'Droplets' },
  { id: 10, name: 'Infectología', description: 'Diagnóstico y tratamiento de enfermedades infecciosas.', icon: 'Shield' },
  { id: 11, name: 'Medicina Física', description: 'Rehabilitación y recuperación funcional del paciente.', icon: 'Activity' },
  { id: 12, name: 'Medicina Interna', description: 'Atención integral de enfermedades en adultos.', icon: 'Stethoscope' },
  { id: 13, name: 'Nefrología', description: 'Diagnóstico y tratamiento de enfermedades renales.', icon: 'Kidneys' },
  { id: 14, name: 'Neonatología', description: 'Cuidado especializado del recién nacido.', icon: 'Heart' },
  { id: 15, name: 'Neumología', description: 'Enfermedades del sistema respiratorio.', icon: 'Lungs' },
  { id: 16, name: 'Neurología', description: 'Trastornos del sistema nervioso central y periférico.', icon: 'Brain' },
  { id: 17, name: 'Nutrición', description: 'Asesoría nutricional y planes de alimentación.', icon: 'Apple' },
  { id: 18, name: 'Odontología', description: 'Salud bucal y atención dental integral.', icon: 'Tooth' },
  { id: 19, name: 'Oftalmología', description: 'Diagnóstico y tratamiento de enfermedades oculares.', icon: 'Eye' },
  { id: 20, name: 'Ortodoncia', description: 'Corrección de la posición dental y mandibular.', icon: 'Tooth' },
  { id: 21, name: 'Otorrinolaringología', description: 'Enfermedades de oído, nariz y garganta.', icon: 'Ear' },
  { id: 22, name: 'Pediatría', description: 'Atención médica integral para niños y adolescentes.', icon: 'Heart' },
  { id: 23, name: 'Psicología', description: 'Salud mental y bienestar emocional.', icon: 'Brain' },
  { id: 24, name: 'Psiquiatría', description: 'Diagnóstico y tratamiento de trastornos mentales.', icon: 'Brain' },
  { id: 25, name: 'Rehabilitación Suelo Pélvico', description: 'Fortalecimiento y recuperación del suelo pélvico.', icon: 'Activity' },
  { id: 26, name: 'Reumatología', description: 'Enfermedades reumáticas y autoinmunes del sistema musculoesquelético.', icon: 'Bone' },
  { id: 27, name: 'Traumatología', description: 'Lesiones del sistema musculoesquelético y fracturas.', icon: 'Bone' },
  { id: 28, name: 'Urología', description: 'Enfermedades del aparato urinario masculino y femenino.', icon: 'Kidneys' },
];

export const featuredSpecialties = specialties.slice(0, 8);

export const doctors = [
  { id: 1, name: 'Dr. Carlos Mendoza', specialty: 'Cardiología', experience: 18, photo: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563EB&color=fff&size=200' },
  { id: 2, name: 'Dra. María Fernández', specialty: 'Pediatría', experience: 15, photo: 'https://ui-avatars.com/api/?name=Maria+Fernandez&background=10B981&color=fff&size=200' },
  { id: 3, name: 'Dr. Roberto Sánchez', specialty: 'Traumatología', experience: 22, photo: 'https://ui-avatars.com/api/?name=Roberto+Sanchez&background=1E40AF&color=fff&size=200' },
  { id: 4, name: 'Dra. Laura Gómez', specialty: 'Dermatología', experience: 12, photo: 'https://ui-avatars.com/api/?name=Laura+Gomez&background=2563EB&color=fff&size=200' },
  { id: 5, name: 'Dr. Andrés Torres', specialty: 'Neurología', experience: 20, photo: 'https://ui-avatars.com/api/?name=Andres+Torres&background=10B981&color=fff&size=200' },
  { id: 6, name: 'Dra. Patricia Ruiz', specialty: 'Ginecología', experience: 16, photo: 'https://ui-avatars.com/api/?name=Patricia+Ruiz&background=1E40AF&color=fff&size=200' },
];

export const procedures = [
  { id: 1, name: 'Consultas médicas', description: 'Atención personalizada con nuestros especialistas.', icon: 'Stethoscope' },
  { id: 2, name: 'Exámenes clínicos', description: 'Análisis y pruebas de laboratorio de alta precisión.', icon: 'Microscope' },
  { id: 3, name: 'Cirugías', description: 'Procedimientos quirúrgicos con tecnología de punta.', icon: 'Activity' },
  { id: 4, name: 'Atención preventiva', description: 'Chequeos regulares para mantener tu salud.', icon: 'Shield' },
  { id: 5, name: 'Telemedicina', description: 'Consultas virtuales desde la comodidad de tu hogar.', icon: 'Video' },
];

export const testimonials = [
  { id: 1, name: 'Ana Martínez', text: 'Excelente atención médica. El Dr. Mendoza me salvó la vida con su diagnóstico temprano. Altamente recomendados.', rating: 5, role: 'Paciente de Cardiología' },
  { id: 2, name: 'Pedro Rodríguez', text: 'La mejor clínica de la ciudad. Instalaciones modernas y un personal muy profesional y cálido.', rating: 5, role: 'Paciente de Traumatología' },
  { id: 3, name: 'Lucía Herrera', text: 'Gracias al equipo de pediatría, mi hijo recibió la mejor atención. Estamos muy agradecidos.', rating: 5, role: 'Madre de paciente' },
  { id: 4, name: 'Miguel Ángel Vargas', text: 'La telemedicina funciona de maravilla. Pude consultar con mi médico sin salir de casa. Muy práctico.', rating: 4, role: 'Paciente de Medicina General' },
];

export const appointments = [
  { id: 1, patient: 'Juan Pérez', doctor: 'Dr. Carlos Mendoza', specialty: 'Cardiología', date: '2026-06-25', time: '10:00', status: 'confirmada' },
  { id: 2, patient: 'María López', doctor: 'Dra. María Fernández', specialty: 'Pediatría', date: '2026-06-25', time: '11:30', status: 'pendiente' },
  { id: 3, patient: 'Carlos Ruiz', doctor: 'Dr. Roberto Sánchez', specialty: 'Traumatología', date: '2026-06-26', time: '09:00', status: 'confirmada' },
  { id: 4, patient: 'Ana Torres', doctor: 'Dra. Laura Gómez', specialty: 'Dermatología', date: '2026-06-26', time: '15:00', status: 'completada' },
  { id: 5, patient: 'José Hernández', doctor: 'Dr. Andrés Torres', specialty: 'Neurología', date: '2026-06-27', time: '08:30', status: 'cancelada' },
];

export const patientData = {
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  phone: '+51 999 888 777',
  dni: '12345678',
  birthDate: '1985-03-15',
  bloodType: 'O+',
  allergies: ['Penicilina', 'Polen'],
  nextAppointment: { date: '2026-06-25', time: '10:00', doctor: 'Dr. Carlos Mendoza', specialty: 'Cardiología' },
  medicalHistory: [
    { date: '2026-01-15', diagnosis: 'Hipertensión arterial', doctor: 'Dr. Carlos Mendoza', notes: 'Paciente con presión elevada. Se receta Enalapril.' },
    { date: '2025-08-20', diagnosis: 'Control general', doctor: 'Dr. Luis García', notes: 'Resultados normales. Continuar con hábitos saludables.' },
    { date: '2025-03-10', diagnosis: 'Infección respiratoria', doctor: 'Dra. María Fernández', notes: 'Infección viral. Reposo y tratamiento sintomático.' },
  ],
  results: [
    { id: 1, name: 'Hemograma completo', date: '2026-06-10', status: 'disponible', file: 'hemograma_jun2026.pdf' },
    { id: 2, name: 'Perfil lipídico', date: '2026-06-10', status: 'disponible', file: 'perfil_lipidico_jun2026.pdf' },
    { id: 3, name: 'Electrocardiograma', date: '2026-06-01', status: 'pendiente', file: null },
    { id: 4, name: 'Radiografía de tórax', date: '2025-12-15', status: 'disponible', file: 'rx_torax_dic2025.pdf' },
  ],
  reminders: [
    { id: 1, text: 'Cita con cardiología - 25 de junio 10:00', date: '2026-06-25' },
    { id: 2, text: 'Ayuno para exámenes de sangre', date: '2026-07-01' },
    { id: 3, text: 'Renovar receta de Enalapril', date: '2026-07-15' },
  ],
};

export const doctorDashboardData = {
  patientsToday: 8,
  upcomingConsultations: [
    { time: '09:00', patient: 'Juan Pérez', reason: 'Control cardíaco' },
    { time: '10:00', patient: 'María López', reason: 'Revisión general' },
    { time: '11:30', patient: 'Carlos Ruiz', reason: 'Resultados' },
    { time: '14:00', patient: 'Ana Torres', reason: 'Consulta dermatológica' },
  ],
  pendingAppointments: 4,
  statistics: { weekly: 28, monthly: 112, totalPatients: 450 },
  patients: [
    { id: 1, name: 'Juan Pérez', age: 45, lastVisit: '2026-06-10', condition: 'Hipertensión' },
    { id: 2, name: 'María López', age: 32, lastVisit: '2026-06-08', condition: 'Control' },
    { id: 3, name: 'Carlos Ruiz', age: 55, lastVisit: '2026-06-05', condition: 'Diabetes tipo 2' },
    { id: 4, name: 'Ana Torres', age: 28, lastVisit: '2026-06-03', condition: 'Dermatitis' },
    { id: 5, name: 'José Hernández', age: 60, lastVisit: '2026-05-28', condition: 'Neurológico' },
  ],
};

export const callCenterData = {
  dailyCalls: 142,
  activeOperators: 8,
  patientsAttended: 98,
  appointmentsGenerated: 65,
  operators: [
    { id: 1, name: 'Laura Mendoza', status: 'disponible', calls: 15 },
    { id: 2, name: 'Carlos Gutiérrez', status: 'en_llamada', calls: 22 },
    { id: 3, name: 'Rosa Ramírez', status: 'ocupado', calls: 18 },
    { id: 4, name: 'Pedro Castillo', status: 'disponible', calls: 12 },
    { id: 5, name: 'Ana Flores', status: 'desconectado', calls: 8 },
    { id: 6, name: 'Luis Torres', status: 'en_llamada', calls: 20 },
    { id: 7, name: 'Mónica Vega', status: 'disponible', calls: 14 },
    { id: 8, name: 'Diego Ríos', status: 'disponible', calls: 10 },
  ],
  activeCalls: [
    { id: 1, patient: 'Roberto Díaz', operator: 'Carlos Gutiérrez', time: '5:23', reason: 'Agendar cita cardiología' },
    { id: 2, patient: 'Sofía Vargas', operator: 'Luis Torres', time: '3:45', reason: 'Consulta resultados' },
    { id: 3, patient: 'Fernando Rivas', operator: 'Rosa Ramírez', time: '8:12', reason: 'Cambio de fecha' },
  ],
  recentHistory: [
    { time: '10:15', patient: 'María López', reason: 'Agendar cita', operator: 'Laura Mendoza', status: 'completada' },
    { time: '10:10', patient: 'Pedro Sánchez', reason: 'Cancelar cita', operator: 'Carlos Gutiérrez', status: 'completada' },
    { time: '10:05', patient: 'Ana Torres', reason: 'Información', operator: 'Rosa Ramírez', status: 'completada' },
    { time: '09:55', patient: 'Luis Herrera', reason: 'Agendar cita', operator: 'Pedro Castillo', status: 'completada' },
  ],
};

export const clinicInfo = {
  name: 'Clínica SaludTotal',
  description: 'Brindamos atención médica de excelencia con más de 25 años de experiencia. Nuestro compromiso es tu bienestar integral.',
  history: 'Fundada en 1998 por un grupo de médicos visionarios, la Clínica SaludTotal nació con la misión de ofrecer atención médica de calidad accesible para todos. Desde entonces, hemos crecido hasta convertirnos en una de las instituciones de salud más respetadas del país, atendiendo a más de 50,000 pacientes al año.',
  mission: 'Ofrecer servicios de salud integrales con los más altos estándares de calidad, calidez y seguridad, promoviendo el bienestar físico y emocional de nuestros pacientes.',
  vision: 'Ser la institución de salud líder en la región, reconocida por nuestra excelencia médica, innovación tecnológica y humanismo en el cuidado de la salud.',
  values: [
    { name: 'Excelencia', description: 'Buscamos la mejora continua en cada servicio' },
    { name: 'Empatía', description: 'Escuchamos y comprendemos a cada paciente' },
    { name: 'Innovación', description: 'Incorporamos tecnología de vanguardia' },
    { name: 'Integridad', description: 'Actuamos con ética y transparencia' },
    { name: 'Trabajo en equipo', description: 'Colaboramos multidisciplinariamente' },
  ],
  team: [
    { name: 'Dr. Ricardo Álamo', role: 'Director Médico', photo: 'https://ui-avatars.com/api/?name=Ricardo+Alamo&background=2563EB&color=fff&size=200' },
    { name: 'Dra. Carmen Flores', role: 'Jefa de Cardiología', photo: 'https://ui-avatars.com/api/?name=Carmen+Flores&background=10B981&color=fff&size=200' },
    { name: 'Dr. Hugo Delgado', role: 'Jefe de Cirugía', photo: 'https://ui-avatars.com/api/?name=Hugo+Delgado&background=1E40AF&color=fff&size=200' },
    { name: 'Dra. Silvia Paredes', role: 'Jefa de Pediatría', photo: 'https://ui-avatars.com/api/?name=Silvia+Paredes&background=2563EB&color=fff&size=200' },
  ],
};
