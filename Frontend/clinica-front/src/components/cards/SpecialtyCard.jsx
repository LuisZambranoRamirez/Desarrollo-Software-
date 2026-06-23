import {
  Heart,
  Brain,
  Stethoscope,
  Eye,
  Activity,
  Droplets,
  Shield,
  Wind,
  Apple,
  Smile,
  Ear,
  Bone,
  Microscope,
  Video,
} from 'lucide-react';

const iconMap = {
  Heart,
  Brain,
  Stethoscope,
  Eye,
  Activity,
  Droplets,
  Shield,
  Lungs: Wind,
  Apple,
  Tooth: Smile,
  Ear,
  Bone,
  Microscope,
  Video,
  Kidneys: Droplets,
};

function SpecialtyCard({ specialty, onClick }) {
  const Icon = iconMap[specialty.icon] || Heart;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#2563EB] transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-center">
        <Icon size={48} className="text-[#2563EB]" />
      </div>
      <h3 className="text-[#1F2937] font-semibold text-lg mt-4 text-center">
        {specialty.name}
      </h3>
      <p className="text-[#6B7280] text-sm mt-2 text-center line-clamp-2">
        {specialty.description}
      </p>
      <div className="mt-4 text-center">
        <span className="text-[#2563EB] hover:underline text-sm font-medium cursor-pointer">
          Más información
        </span>
      </div>
    </div>
  );
}

export default SpecialtyCard;
