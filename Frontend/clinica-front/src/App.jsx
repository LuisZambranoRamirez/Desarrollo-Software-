import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Especialidades from './pages/public/Especialidades';
import Nosotros from './pages/public/Nosotros';
import Contacto from './pages/public/Contacto';
import LoginPaciente from './pages/public/LoginPaciente';
import LoginMedico from './pages/public/LoginMedico';
import DashboardPaciente from './pages/paciente/DashboardPaciente';
import MisCitas from './pages/paciente/MisCitas';
import HistorialMedico from './pages/paciente/HistorialMedico';
import Resultados from './pages/paciente/Resultados';
import PerfilPaciente from './pages/paciente/PerfilPaciente';
import ConfiguracionPaciente from './pages/paciente/ConfiguracionPaciente';
import DashboardMedico from './pages/medico/DashboardMedico';
import Agenda from './pages/medico/Agenda';
import PacientesMedico from './pages/medico/PacientesMedico';
import HistorialClinico from './pages/medico/HistorialClinico';
import Consultas from './pages/medico/Consultas';
import ReportesMedico from './pages/medico/ReportesMedico';
import PerfilMedico from './pages/medico/PerfilMedico';
import DashboardCallCenter from './pages/callcenter/DashboardCallCenter';
import CentralLlamadas from './pages/callcenter/CentralLlamadas';
import PacientesCallCenter from './pages/callcenter/PacientesCallCenter';
import CitasCallCenter from './pages/callcenter/CitasCallCenter';
import MedicosCallCenter from './pages/callcenter/MedicosCallCenter';
import ReportesCallCenter from './pages/callcenter/ReportesCallCenter';
import ConfiguracionCallCenter from './pages/callcenter/ConfiguracionCallCenter';
import { RealtimeProvider } from './context/RealtimeContext.jsx';

function App() {
  return (
    <RealtimeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login-paciente" element={<LoginPaciente />} />
          <Route path="/login-medico" element={<LoginMedico />} />
          <Route path="/dashboard-paciente" element={<DashboardPaciente />} />
          <Route path="/dashboard-paciente/citas" element={<MisCitas />} />
          <Route path="/dashboard-paciente/historial" element={<HistorialMedico />} />
          <Route path="/dashboard-paciente/resultados" element={<Resultados />} />
          <Route path="/dashboard-paciente/perfil" element={<PerfilPaciente />} />
          <Route path="/dashboard-paciente/configuracion" element={<ConfiguracionPaciente />} />
          <Route path="/dashboard-medico" element={<DashboardMedico />} />
          <Route path="/dashboard-medico/agenda" element={<Agenda />} />
          <Route path="/dashboard-medico/pacientes" element={<PacientesMedico />} />
          <Route path="/dashboard-medico/historial" element={<HistorialClinico />} />
          <Route path="/dashboard-medico/consultas" element={<Consultas />} />
          <Route path="/dashboard-medico/reportes" element={<ReportesMedico />} />
          <Route path="/dashboard-medico/perfil" element={<PerfilMedico />} />
          <Route path="/dashboard-callcenter" element={<DashboardCallCenter />} />
          <Route path="/dashboard-callcenter/llamadas" element={<CentralLlamadas />} />
          <Route path="/dashboard-callcenter/pacientes" element={<PacientesCallCenter />} />
          <Route path="/dashboard-callcenter/citas" element={<CitasCallCenter />} />
          <Route path="/dashboard-callcenter/medicos" element={<MedicosCallCenter />} />
          <Route path="/dashboard-callcenter/reportes" element={<ReportesCallCenter />} />
          <Route path="/dashboard-callcenter/configuracion" element={<ConfiguracionCallCenter />} />
        </Routes>
      </BrowserRouter>
    </RealtimeProvider>
  );
}

export default App;
