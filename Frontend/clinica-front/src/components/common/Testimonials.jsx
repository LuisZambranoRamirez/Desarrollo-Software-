import { Star } from 'lucide-react';
import { testimonials } from '../../data/mockData';

function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
          Testimonios
        </h2>
        <p className="text-center text-[#6B7280] mb-12 max-w-2xl mx-auto">
          Conoce las experiencias de nuestros pacientes y descubre por qué somos su clínica de confianza.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < item.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-200'}
                  />
                ))}
              </div>
              <p className="text-[#4B5563] italic mb-4">"{item.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=2563EB&color=fff&size=80`}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-[#1F2937]">{item.name}</p>
                  <p className="text-sm text-[#6B7280]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
