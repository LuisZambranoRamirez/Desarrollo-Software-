import { Calendar, Clock } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const statusColors = {
  confirmada: 'border-l-green-500',
  pendiente: 'border-l-yellow-500',
  completada: 'border-l-blue-500',
  cancelada: 'border-l-red-500',
};

const statusBadge = {
  confirmada: { variant: 'green', label: 'Confirmada' },
  pendiente: { variant: 'yellow', label: 'Pendiente' },
  completada: { variant: 'blue', label: 'Completada' },
  cancelada: { variant: 'red', label: 'Cancelada' },
};

function AppointmentCard({ appointment, variant = 'paciente' }) {
  const borderColor = statusColors[appointment.status] || 'border-l-gray-300';
  const badge = statusBadge[appointment.status] || { variant: 'gray', label: appointment.status };

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 border-l-4 ${borderColor}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          {variant === 'paciente' ? (
            <p className="text-[#1F2937] font-semibold">{appointment.especialidad}</p>
          ) : (
            <p className="text-[#1F2937] font-semibold">{appointment.paciente}</p>
          )}
          <p className="text-[#6B7280] text-sm">
            {variant === 'paciente' ? appointment.doctor : appointment.paciente}
          </p>
        </div>
        <Badge variant={badge.variant}>{badge.label}</Badge>
      </div>
      <div className="flex items-center gap-4 text-sm text-[#6B7280]">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{appointment.time}</span>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
