import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Microscope, Activity, Shield, Video } from 'lucide-react';
import Button from '../../components/ui/Button';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/common/HeroSection';
import Testimonials from '../../components/common/Testimonials';
import DoctorCard from '../../components/cards/DoctorCard';
import SpecialtyCard from '../../components/cards/SpecialtyCard';
import { doctors, featuredSpecialties, procedures } from '../../data/mockData';

const procedureIcons = {
  Stethoscope,
  Microscope,
  Activity,
  Shield,
  Video,
};

function Home() {
  return (
    <Layout>
      <HeroSection />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">Especialidades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSpecialties.map((spec) => (
              <SpecialtyCard key={spec.id} specialty={spec} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/especialidades">
              <Button variant="outline" size="lg">
                Ver todas las especialidades
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">Procedimientos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {procedures.map((proc) => {
              const Icon = procedureIcons[proc.icon] || Stethoscope;

              return (
                <div key={proc.id} className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#2563EB]">
                  <Icon size={40} className="text-[#2563EB] mb-4" />
                  <h3 className="font-semibold text-[#1F2937] text-lg mb-2">{proc.name}</h3>
                  <p className="text-[#6B7280] text-sm">{proc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">Médicos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </Layout>
  );
}

export default Home;
