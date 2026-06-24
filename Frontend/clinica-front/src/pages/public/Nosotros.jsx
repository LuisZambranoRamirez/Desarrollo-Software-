import Layout from '../../components/layout/Layout';
import { clinicInfo } from '../../data/mockData';

function Nosotros() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
            Sobre Nosotros
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-[#4B5563] leading-relaxed">{clinicInfo.history}</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#2563EB] mb-2">Misión</h2>
                <p className="text-[#4B5563]">{clinicInfo.mission}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#2563EB] mb-2">Visión</h2>
                <p className="text-[#4B5563]">{clinicInfo.vision}</p>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-8">Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {clinicInfo.values.map((val, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 text-center">
                <h3 className="font-semibold text-[#1F2937] text-lg mb-2">{val.name}</h3>
                <p className="text-[#6B7280] text-sm">{val.description}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-8">Equipo Médico</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicInfo.team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-[#1F2937]">{member.name}</h3>
                  <p className="text-[#6B7280] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Nosotros;
