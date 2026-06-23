import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import SpecialtyCard from '../../components/cards/SpecialtyCard';
import SearchBar from '../../components/ui/SearchBar';
import { specialties } from '../../data/mockData';

function Especialidades() {
  const [search, setSearch] = useState('');

  const filtered = specialties.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-[#1F2937] mb-4">
            Todas las Especialidades
          </h1>
          <p className="text-center text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Contamos con un amplio equipo de especialistas para brindarte la mejor atención médica.
          </p>
          <div className="max-w-md mx-auto mb-10">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar especialidad..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((spec) => (
              <SpecialtyCard key={spec.id} specialty={spec} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#6B7280] mt-12">
              No se encontraron especialidades con ese nombre.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Especialidades;
