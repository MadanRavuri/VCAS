
import React from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import {
  MonitorSmartphone,
  ShoppingCart,
  Users,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const services = [
  {
    id: 'it-consulting',
    Icon: MonitorSmartphone,
    title: "IT Consulting Business",
    desc: "Providing expert IT consulting services to help organizations design, implement, and optimize technology solutions aligned with business goals.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    glow: "shadow-blue-500/10",
    image: "/itcon vcas.jpg" // Ensure this image exists or is handled
  },
  {
    id: 'ecommerce',
    Icon: ShoppingCart,
    title: "E-Commerce Planning",
    desc: "Planning, development, production, operation, and management of e-commerce platforms for scalable digital business growth.",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    glow: "shadow-sky-500/10",
    image: "/E vcas.jpg"
  },
  {
    id: 'hr-consulting',
    Icon: Users,
    title: "HR Consulting",
    desc: "Providing HR consulting services including talent acquisition strategy, workforce planning, and organizational development.",
    color: "text-navy",
    bg: "bg-gray-100",
    border: "border-gray-200",
    glow: "shadow-navy/10",
    image: "/HRvcas.jpg"
  }
];

interface ServicesPageProps {
  onNavigate: (page: any) => void;
  onServiceSelect?: (service: any) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onServiceSelect }) => {

  return (
    <div className="pb-24">
      {/* Hero Section - Video with minimal overlay */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <BackgroundVideo
            src="/service.mp4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-transparent" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Our Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              Comprehensive <span className="text-primary">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tailored solutions to drive innovation and growth for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl border ${s.border} bg-white shadow-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer`}
                onClick={() => onServiceSelect && onServiceSelect(s)}
              >
                <div className={`w-16 h-16 rounded-2xl ${s.bg} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110`}>
                  <s.Icon className={`w-8 h-8 ${s.color}`} strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {s.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm mb-8 flex-grow">
                  {s.desc}
                </p>

                <div className={`flex items-center gap-2 ${s.color} font-bold text-sm tracking-wide transition-all duration-300 transform group-hover:translate-x-2`}>
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light tracking-wide">
              A proven methodology to deliver successful AI implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Discovery", desc: "We analyze your business needs and identify AI opportunities." },
              { number: "02", title: "Strategy", desc: "Develop a comprehensive AI strategy aligned with your goals." },
              { number: "03", title: "Implementation", desc: "Execute the solution with our expert team of AI engineers." },
              { number: "04", title: "Optimization", desc: "Continuously monitor and optimize for maximum performance." }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="
                  process-card h-full rounded-3xl border border-gray-100 shadow-md transition-all duration-300 flex flex-col items-start p-8
                  bg-white
                  md:group-hover:bg-gradient-to-br md:group-hover:from-navy md:group-hover:to-blue-700
                  md:group-hover:shadow-2xl md:group-hover:shadow-navy/25 md:group-hover:-translate-y-2 md:group-hover:border-transparent
                  active:scale-[0.98] active:bg-blue-50
                ">
                  <div className="
                    process-number w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 mb-6
                    bg-primary text-white shadow-primary/20
                    md:group-hover:bg-white md:group-hover:text-navy md:group-hover:scale-110 md:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                  ">
                    {step.number}
                  </div>

                  <h3 className="process-title text-xl font-bold mb-4 transition-colors duration-300 text-gray-900 md:group-hover:text-white">{step.title}</h3>
                  <p className="process-desc text-sm leading-relaxed transition-colors duration-300 text-gray-600 md:group-hover:text-blue-100">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[40px] relative overflow-hidden shadow-2xl border border-white/10 text-center"
            style={{
              background: 'linear-gradient(rgba(8, 25, 60, 0.85), rgba(15, 45, 95, 0.85)), url("/service.mp4")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>

            <div className="absolute inset-0 backdrop-blur-[2px] -z-10"></div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight relative z-10">
              Ready to Transform Your <span className="text-sky-400">Business?</span>
            </h2>
            <p className="text-blue-50 text-lg mb-10 max-w-xl mx-auto leading-relaxed relative z-10 font-light drop-shadow-md">
              Partner with VCAS for expert bilingual consulting and comprehensive business solutions. Let's build the future together.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg relative z-10 hover:shadow-blue-500/30"
              style={{ background: 'linear-gradient(to right, #2563eb, #3b82f6)' }}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Contact Us Today</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
