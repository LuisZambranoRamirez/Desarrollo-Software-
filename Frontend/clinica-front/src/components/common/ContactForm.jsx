import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado correctamente');
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1F2937] mb-12">
          Contáctanos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Nombre" placeholder="Tu nombre completo" name="nombre" />
            <Input label="Correo" type="email" placeholder="tu@correo.com" name="correo" />
            <Input label="Teléfono" type="tel" placeholder="+51 999 888 777" name="telefono" />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                rows={5}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Enviar mensaje
            </Button>
          </form>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-[#EFF6FF] p-3 rounded-xl">
                <Phone size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">Teléfono</p>
                <p className="text-[#6B7280]">+51 1 234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#EFF6FF] p-3 rounded-xl">
                <Mail size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">Correo</p>
                <p className="text-[#6B7280]">contacto@clinicasaludtotal.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#EFF6FF] p-3 rounded-xl">
                <MapPin size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">Dirección</p>
                <p className="text-[#6B7280]">Av. La Salud 1234, Lima, Perú</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#EFF6FF] p-3 rounded-xl">
                <Clock size={24} className="text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-[#1F2937]">Horario</p>
                <p className="text-[#6B7280]">Lun - Vie: 8:00 AM - 8:00 PM</p>
                <p className="text-[#6B7280]">Sáb: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
