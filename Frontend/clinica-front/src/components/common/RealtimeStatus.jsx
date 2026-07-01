import { Wifi, WifiOff } from 'lucide-react';
import { useRealtime } from '../../context/RealtimeContext.jsx';

const statusConfig = {
  connected: {
    label: 'Backend conectado',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Wifi,
  },
  connecting: {
    label: 'Conectando backend',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Wifi,
  },
  disconnected: {
    label: 'Reconectando backend',
    className: 'bg-slate-50 text-slate-600 border-slate-200',
    icon: WifiOff,
  },
  error: {
    label: 'Backend sin respuesta',
    className: 'bg-red-50 text-red-700 border-red-200',
    icon: WifiOff,
  },
};

function RealtimeStatus() {
  const { status } = useRealtime();
  const config = statusConfig[status] ?? statusConfig.disconnected;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium ${config.className}`}>
      <Icon size={16} />
      <span>{config.label}</span>
    </div>
  );
}

export default RealtimeStatus;
