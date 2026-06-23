function DoctorCard({ doctor, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:scale-[1.02] transition ${className}`}
    >
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-[#1F2937] font-semibold text-lg">{doctor.name}</h3>
        <p className="text-[#6B7280] text-sm">{doctor.specialty}</p>
        <p className="text-[#2563EB] text-sm font-medium mt-1">
          {doctor.experience} años de experiencia
        </p>
        <button className="mt-4 w-full bg-[#2563EB] text-white rounded-xl py-2 px-4 font-medium">
          Agendar cita
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;
