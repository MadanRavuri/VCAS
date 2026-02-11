import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ServiceDetailProps {
    service: any;
    onBack: () => void;
    onNavigate: (page: any) => void;
}

const ServiceDetailPage: React.FC<ServiceDetailProps> = ({ service, onBack, onNavigate }) => {
    const [showFloatingBack, setShowFloatingBack] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            setShowFloatingBack(scrollY > 200);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!service) return null;

    return (
        <div className="pb-24 min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] md:h-[60vh] overflow-hidden flex items-start pt-8 md:pt-12">
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
            <section className="py-8 md:py-12 bg-white -mt-16 md:-mt-20 relative z-20 rounded-t-[30px] md:rounded-t-[40px] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                        {/* Left Column: Detailed Description */}
                        <div className="lg:col-span-2 space-y-8 md:space-y-12 pt-4 md:pt-8">

                            {/* Service Header Info */}
                            <div>
                                <div className="flex flex-col gap-4 md:gap-6 items-start mb-6">
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 ${service.glow} shadow-lg shrink-0`}>
                                        <service.Icon className={`w-8 h-8 md:w-10 md:h-10 ${service.color}`} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                                            {service.title}
                                        </h1>
                                        <div className="h-1 w-16 md:w-20 bg-primary rounded-full" />
                                    </div>
                                </div>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
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
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-primary/30 transition-all">
                                            <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 ${service.color} mb-4`} />
                                            <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Feature {item}</h4>
                                            <p className="text-sm text-gray-600">Detailed explanation of the feature and its benefits to the client.</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: CTA Box */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 lg:top-24 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-xl">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Interested in this service?</h3>
                                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                                    Get in touch with our team to discuss how we can help upgrade your business with our {service.title} solutions.
                                </p>
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="w-full py-3 md:py-4 rounded-xl bg-primary text-white font-bold text-base md:text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Floating Back Button - Appears when scrolling down */}
            {showFloatingBack && (
                <button
                    onClick={onBack}
                    className="fixed bottom-4 right-4 md:bottom-8 md:left-8 z-50 inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-gray-900 hover:bg-white transition-all group shadow-lg hover:shadow-xl"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline text-sm md:text-base">Back to Services</span>
                </button>
            )}
        </div>
    );
};

export default ServiceDetailPage;
