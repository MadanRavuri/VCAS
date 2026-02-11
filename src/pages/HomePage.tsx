import React, { useEffect, useState, useRef } from 'react';
import BackgroundVideo from '../components/BackgroundVideo';
import {
    ArrowRight,
    Users,
    MonitorSmartphone, ShoppingCart, Play
} from 'lucide-react';


const HomePage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const hasPlayedRef = useRef(false);

    useEffect(() => {
        setIsVisible(true);
        const video = videoRef.current;
        if (!video) return;

        // Method 2: Auto Seek To 3 Seconds On Load for Cover Frame
        const setCoverFrame = () => {
            if (!hasPlayedRef.current) {
                video.currentTime = 1;
            }
        };

        if (video.readyState >= 1) {
            setCoverFrame();
        } else {
            video.addEventListener('loadedmetadata', setCoverFrame);
        }

        return () => {
            video.removeEventListener('loadedmetadata', setCoverFrame);
        };
    }, []);

    const handlePlay = () => {
        if (!hasPlayedRef.current && videoRef.current) {
            // Option A: Start From Beginning
            videoRef.current.currentTime = 0;
            hasPlayedRef.current = true;
        }
        setHasStarted(true);
    };

    const services = [
        {
            icon: <MonitorSmartphone className="w-12 h-12" />,
            title: "IT Consulting Business",
            desc: "Providing expert IT consulting services to help organizations design, implement, and optimize technology solutions aligned with business goals.",
            color: "from-blue-500 to-cyan-400"
        },
        {
            icon: <ShoppingCart className="w-12 h-12" />,
            title: "E-Commerce Planning",
            desc: "Planning, development, production, operation, and management of e-commerce platforms for scalable digital business growth.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "HR Consulting",
            desc: "Providing HR consulting services including talent acquisition strategy, workforce planning, and organizational development.",
            color: "from-teal-500 to-emerald-500"
        }
    ];

    const partners = [
        {
            name: "Ideal Folks",
            logo: "/idealfolkslogo.webp",
            desc: "A leading provider of end-to-end IT services and executive search solutions for global enterprises, with strong operational expertise and a primary focus on the Japanese market.",
            url: "https://www.idealfolks.com"
        },
        {
            name: "Vision AI",
            logo: "/Vision_logo.png",
            desc: "Vision AI bridges Japan's technological resource gap by leveraging offshore talent to deliver cutting-edge, AI-driven solutions. We support resource transfer and centralized delivery to help organizations streamline operations and improve execution efficiency.",
            url: "https://www.visionai.jp"
        }
    ];

    return (
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} font-sans`}>

            {/* 2️⃣ HERO SECTION - Original Video Only Style */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
                <div className="absolute inset-0 z-0 w-full h-full">
                    <BackgroundVideo
                        src="/Home.mp4"
                        className="w-full h-full object-cover"
                    />
                    {/* Strong Corporate Navy Overlay */}
                    <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/10" />
                </div>
            </section>

            {/* 3️⃣ VIDEO OVERVIEW SECTION - Restored Content */}
            {/* 3️⃣ VIDEO OVERVIEW SECTION - Restored Content */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, #0a192f 50%, #0a192f 100%)' }}>
                {/* Background Pattern - Visible only on the navy part */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', top: '50%' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Company Overview</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy tracking-tight">
                            See VCAS <span className="text-primary">in Action</span>
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-light">
                            Discover how our autonomous AI systems revolutionize enterprise software development.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto relative group">
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2 shadow-2xl shadow-navy/50 backdrop-blur-sm">
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-video group">
                                <video
                                    ref={videoRef}
                                    src="/video.mp4"
                                    className="w-full h-full object-cover"
                                    controls={hasStarted}
                                    playsInline
                                    preload="metadata"
                                    onPlay={handlePlay}
                                >
                                    Your browser does not support the video tag.
                                </video>

                                {/* Custom Play Overlay */}
                                {!hasStarted && (
                                    <div
                                        className="absolute inset-0 bg-navy/30 flex items-center justify-center cursor-pointer transition-opacity duration-500 z-10"
                                        onClick={() => videoRef.current?.play()}
                                    >
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-[80px] -z-10" />
                    </div>
                </div>
            </section>

            {/* 4️⃣ ABOUT US SECTION - Improved Layout */}
            <section className="py-24 bg-muted relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <div className="text-center order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white mb-6 shadow-sm mx-auto">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">About VCAS</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight text-center">
                            About
                        </h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                                VCAS 合同会社 is a premier bridge between India and Japan, committed to providing top-tier IT consulting and services through transparent, streamlined collaboration and bilingual expertise.
                            </p>

                            <div className="flex justify-center">
                                <button
                                    onClick={() => onNavigate('about')}
                                    className="px-8 py-4 rounded-lg border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-all flex items-center gap-2 group"
                                >
                                    Learn More About Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Video - Better responsive layout */}
                        <div className="relative h-full min-h-[300px] md:min-h-[400px] order-1 lg:order-2">
                            <div className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl group">
                                <video
                                    src="/about.mp4"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                                {/* Optional: Subtle overlay for depth */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl md:rounded-3xl pointer-events-none" />
                            </div>
                            {/* Decorative Blobs */}
                            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5️⃣ OUR SERVICES SECTION - Restored Content */}
            <section className="py-24 relative bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">What We Offer</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-navy tracking-tight">
                            Our <span className="text-primary">Services</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
                            Comprehensive AI solutions designed to transform your business operations and accelerate growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
                        {services.map((service, index) => {
                            const isCenter = index === 1;
                            return (
                                <div
                                    key={index}
                                    onClick={() => onNavigate('services')}
                                    className={`group rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between relative
                                        ${isCenter
                                            ? 'bg-navy text-white shadow-2xl shadow-navy/30 md:-translate-y-4 md:scale-105 z-10 border border-navy'
                                            : 'bg-white text-navy shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 border border-slate-100'
                                        }`}
                                >
                                    <div>
                                        <div className={`mb-6 w-16 h-16 rounded-xl flex items-center justify-center transition-colors
                                            ${isCenter
                                                ? 'bg-white/10 text-white'
                                                : 'bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white'
                                            }`}
                                        >
                                            {React.cloneElement(service.icon as React.ReactElement, { className: "w-8 h-8" })}
                                        </div>
                                        <h4 className={`text-xl font-bold mb-4 ${isCenter ? 'text-white' : 'text-navy'}`}>
                                            {service.title}
                                        </h4>
                                        <p className={`leading-relaxed mb-6 font-medium ${isCenter ? 'text-gray-300' : 'text-slate-500'}`}>
                                            {service.desc}
                                        </p>
                                    </div>
                                    <div className={`flex items-center gap-2 font-bold text-sm tracking-wide transition-all uppercase
                                        ${isCenter ? 'text-white opacity-80 group-hover:opacity-100 group-hover:gap-4' : 'text-navy group-hover:text-primary group-hover:gap-4'}`}
                                    >
                                        READ MORE <ArrowRight className={`w-4 h-4 ${isCenter ? 'text-white' : 'text-primary'}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => onNavigate('services')}
                            className="px-8 py-4 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-hover hover:scale-105 transition-all shadow-xl shadow-primary/20"
                        >
                            View All Services
                        </button>
                    </div>
                </div>
            </section>

            {/* 6️⃣ GLOBAL PARTNERS SECTION */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a192f 0%, #1e3a8a 50%, #0a192f 95%, #ffffff 95%, #ffffff 100%)' }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6 backdrop-blur-sm">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-300">Our Network</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            Our <span className="text-sky-400">Global Partners</span>
                        </h2>
                        <p className="text-blue-100/80 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                            We collaborate with leading technology companies to deliver world-class solutions.
                        </p>
                    </div>

                    {/* Partners Grid - Fixed Desktop Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center max-w-4xl mx-auto">
                        {partners.map((partner, index) => {
                            const isCenter = index === 1;
                            return (
                                <div
                                    key={index}
                                    className={`group rounded-3xl p-8 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center relative
                                        ${isCenter
                                            ? 'bg-[#0a192f] border border-blue-500/30 shadow-2xl shadow-blue-900/50 md:scale-110 z-20 h-[420px] w-full max-w-md'
                                            : 'bg-white/95 border border-white/20 shadow-lg shadow-black/10 md:scale-95 z-10 h-[380px] w-full max-w-md hover:-translate-y-2 hover:shadow-xl'
                                        }`}
                                >
                                    <div className={`w-full h-32 flex items-center justify-center mb-8 rounded-2xl p-6 transition-transform duration-300
                                        ${isCenter
                                            ? (partner.name === 'Vision AI' ? 'bg-white shadow-inner -mt-4' : 'bg-white/5 backdrop-blur-sm')
                                            : 'bg-gray-50'}`}
                                    >
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className={`w-auto max-w-full object-contain transition-all duration-300
                                                ${partner.name === 'Vision AI' ? 'h-14' : 'h-full'}
                                                ${isCenter ? 'opacity-100 brightness-110 filter drop-shadow-lg' : 'opacity-90 group-hover:opacity-100'}`}
                                        />
                                    </div>
                                    <h4 className={`text-xl font-bold mb-4 text-center ${isCenter ? 'text-white' : 'text-gray-800'}`}>
                                        {partner.name}
                                    </h4>
                                    <p className={`text-center leading-relaxed mb-8 flex-grow 
                                        ${partner.name === 'Vision AI' ? 'text-xs' : 'text-sm'}
                                        ${isCenter ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {partner.desc}
                                    </p>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => window.open(partner.url, '_blank')}
                                            className={`px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-all border mt-auto
                                                ${isCenter
                                                    ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-lg shadow-blue-500/30'
                                                    : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-md shadow-blue-200/50'}`}
                                        >
                                            Visit Website
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};


export default HomePage;
