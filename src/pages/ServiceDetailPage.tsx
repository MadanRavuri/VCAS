import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ServiceDetailProps {
    service: any;
    onBack: () => void;
    onNavigate: (page: any) => void;
}

const ServiceDetailPage: React.FC<ServiceDetailProps> = ({ service, onBack, onNavigate }) => {
    if (!service) return null;

    return (
        <div className="pb-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] overflow-hidden flex items-start pt-8">
                {/* Background Image or Gradient */}
                {service.image ? (
                    <div className="absolute inset-0">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                    </div>
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-20`} />
                )}

                <div className="container mx-auto px-6 relative z-10 w-full">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/20 text-gray-900 hover:bg-white transition-all group shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Services</span>
                    </button>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-white -mt-20 relative z-20 rounded-t-[40px] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column: Detailed Description */}
                        <div className="lg:col-span-2 space-y-12 pt-8">

                            {/* Service Header Info */}
                            <div>
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                                    <div className={`w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 ${service.glow} shadow-lg shrink-0`}>
                                        <service.Icon className={`w-10 h-10 ${service.color}`} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                                            {service.title}
                                        </h1>
                                        <div className="h-1 w-20 bg-primary rounded-full" />
                                    </div>
                                </div>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                                <div className="prose prose-lg max-w-none text-gray-600">
                                    <p className="leading-relaxed">
                                        Overview content for {service.title} goes here. This section will contain detailed information about the service, matching the style and depth needed for professional presentation.
                                    </p>
                                    <p className="leading-relaxed mt-4">
                                        We specialize in delivering high-impact solutions that drive growth and efficiency. Our approach combines industry expertise with cutting-edge technology.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-primary/30 transition-all">
                                            <CheckCircle2 className={`w-6 h-6 ${service.color} mb-4`} />
                                            <h4 className="text-xl font-bold text-gray-900 mb-2">Feature {item}</h4>
                                            <p className="text-sm text-gray-600">Detailed explanation of the feature and its benefits to the client.</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: CTA Box */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 p-8 rounded-3xl bg-white border border-gray-100 shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in this service?</h3>
                                <p className="text-gray-600 mb-8">
                                    Get in touch with our team to discuss how we can help upgrade your business with our {service.title} solutions.
                                </p>
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
