import React from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import {
  Briefcase,
  Code,
  Users,
  Rocket,
  ArrowRight,
  MapPin,
  Clock,
  Globe,
  ShieldCheck
} from 'lucide-react';

const CareerPage: React.FC<{ onNavigate: (page: any, position?: string) => void }> = ({ onNavigate }) => {

  const jobCategories = [
    { title: 'Engineering', count: 1, icon: <Code className="w-6 h-6" /> },
    { title: 'Operations & PMO', count: 2, icon: <ShieldCheck className="w-6 h-6" /> },
    { title: 'Translation', count: 1, icon: <Briefcase className="w-6 h-6" /> },
  ];

  const openPositions = [
    {
      title: 'Bilingual Java Full Stack Developer',
      department: 'Engineering',
      location: 'Tokyo, Japan',
      type: 'Full-time',
      salary: '¥8M - ¥12M',
      tags: ['Java', 'React', 'Bilingual'],
      description: "Looking for bilingual (Japanese + English) Java Full Stack developers with strong backend and frontend development skills and experience working in enterprise or corporate environments.",
      useModal: true
    },
    {
      title: 'Bilingual Project Manager',
      department: 'Operations & PMO',
      location: 'Tokyo, Japan',
      type: 'Full-time',
      salary: '¥9M - ¥14M',
      tags: ['PMP', 'Agile', 'Client Relations'],
      description: "Seeking bilingual project managers capable of handling client communication, project delivery coordination, and cross-country project execution between Japan and global teams.",
      useModal: true
    },
    {
      title: 'Bilingual PMO Consultant',
      department: 'Operations & PMO',
      location: 'Tokyo, Japan',
      type: 'Contract',
      salary: '¥800k - ¥1.2M / mo',
      tags: ['Governance', 'Reporting', 'Bilingual'],
      description: "Looking for bilingual PMO consultants who can support project governance, reporting, documentation, and coordination between business and technical teams.",
      useModal: false
    },
    {
      title: 'Japanese Translator / Interpreter',
      department: 'Translation',
      location: 'Tokyo, Japan',
      type: 'Contract / Full-time',
      salary: '¥5M - ¥8M',
      tags: ['N1', 'Interpretation', 'Technical'],
      description: "Seeking professional Japanese language translators and interpreters to support business communication, documentation translation, and client interactions.",
      useModal: true
    }
  ];

  const perks = [
    { icon: <Globe />, title: "Remote First", desc: "Work from anywhere in the world with our globally distributed team structure." },
    { icon: <Rocket />, title: "Rapid Growth", desc: "Join a fast-scaling startup where your contributions directly shape the product." },
    { icon: <Users />, title: "Elite Team", desc: "Collaborate with top-tier engineers and researchers from world-class institutions." },
  ];

  const positionsRef = React.useRef<HTMLElement>(null);

  const scrollToPositions = () => {
    positionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <BackgroundVideo
            src="/career.mp4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4 sm:px-6 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Join Our Team
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Build your career with VCAS
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white relative -mt-10 mb-10 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {jobCategories.map((cat, i) => (
              <div
                key={i}
                onClick={scrollToPositions}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-primary group-hover:scale-110 transition-transform bg-primary/5 p-3 rounded-xl">
                  {cat.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{cat.title}</div>
                  <div className="text-xs text-primary uppercase tracking-widest font-bold">{cat.count} Openings</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions */}
      <section ref={positionsRef} className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">Open <span className="text-primary">Positions</span></h2>
                <p className="text-gray-600 uppercase tracking-widest text-sm font-bold">Latest opportunities</p>
              </div>
              <div className="text-gray-500 text-sm hidden md:block font-medium">
                Showing {openPositions.length} positions
              </div>
            </div>

            {openPositions.map((job, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary/30 transition-all shadow-md hover:shadow-xl flex flex-col items-start gap-8 hover:-translate-y-1">
                <div className="space-y-4 w-full">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {job.location}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {job.type}</div>
                      <div className="flex items-center gap-2 font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{job.salary}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed font-light">
                    {job.description}
                  </p>
                </div>

                <div className="w-full h-px bg-gray-100" />

                <button
                  onClick={() => onNavigate('application', job.title)}
                  className="self-start px-8 py-3 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VCAS Section - Redesigned */}
      <section className="py-24 relative overflow-hidden bg-white">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-navy">
              Why <span className="text-primary">VCAS?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Beyond the code, we build for human potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {perks.map((perk, i) => {
              const isCenter = i === 1;
              return (
                <div
                  key={i}
                  className={`
                    group relative p-10 rounded-[2rem] border flex flex-col items-center text-center transition-all duration-500
                    ${isCenter
                      ? 'bg-navy-light border-white/10 shadow-2xl shadow-black/50 lg:-translate-y-6 lg:z-10 hover:brightness-110'
                      : 'bg-white border-transparent shadow-xl shadow-navy/10 hover:-translate-y-2 hover:shadow-primary/20 md:last:col-span-2 lg:last:col-span-1'
                    }
                  `}
                >
                  {/* Icon Container */}
                  <div className={`
                        w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110
                        ${isCenter
                      ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/10'
                      : 'bg-blue-50 text-primary'
                    }
                    `}>
                    {React.cloneElement(perk.icon as React.ReactElement, {
                      strokeWidth: 1.5,
                      className: isCenter ? "w-10 h-10 text-white" : "w-10 h-10 text-primary"
                    })}
                  </div>

                  {/* Content */}
                  <h4 className={`text-2xl font-bold mb-4 ${isCenter ? 'text-white' : 'text-navy'}`}>
                    {perk.title}
                  </h4>
                  <p className={`text-base leading-relaxed ${isCenter ? 'text-gray-400' : 'text-gray-500'}`}>
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="p-16 rounded-[40px] bg-navy border border-white/10 text-center relative overflow-hidden group shadow-2xl shadow-navy/50">
          {/* subtle radial gradient overlay acting as the hero background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-navy to-navy pointer-events-none" />

          {/* Decorative faint grid or noise could be added here if desired, but sticking to requested simple gradient */}

          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white relative z-10 tracking-tight">
            Don't see the right <br /><span className="text-primary">role?</span>
          </h2>

          <p className="text-blue-100/80 text-lg mb-12 max-w-xl mx-auto relative z-10 font-light leading-relaxed">
            We're always looking for brilliant minds. Send us your portfolio and tell us how you can help evolve VCAS.
          </p>

          <button
            onClick={() => onNavigate('application', 'General Application')}
            className="relative z-10 px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary-hover transition-all flex items-center justify-center mx-auto shadow-xl shadow-black/20 hover:scale-105 hover:shadow-primary/30"
          >
            General Application
          </button>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
