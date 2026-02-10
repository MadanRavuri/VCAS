import React, { useEffect, useState, memo, useMemo } from 'react';
import { Home, Rocket, Users, MessageCircle, Cpu } from 'lucide-react';
// BackgroundVideo moved to App.tsx for persistence

type Page = 'home' | 'career' | 'about' | 'contact' | 'services';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  isCompact?: boolean; // Control if displayed in side panel
}

const LandingPage = memo(({ onNavigate, isCompact = false }: LandingPageProps) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [distance, setDistance] = useState(180);

  useEffect(() => {
    setLogoLoaded(true);

    const updateDistance = () => {
      // Reduced distance by ~25%
      setDistance(window.innerWidth >= 768 ? 180 : 135);
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  const buttons = useMemo(() => [
    { icon: Home, label: 'Home', page: 'home' as Page, angle: 0 },         // Top (0°)
    { icon: Users, label: 'About Us', page: 'about' as Page, angle: 72 },       // Top-Rightish
    { icon: Cpu, label: 'Services', page: 'services' as Page, angle: 144 }, // Bottom-Right
    { icon: Rocket, label: 'Career', page: 'career' as Page, angle: 216 },    // Bottom-Left
    { icon: MessageCircle, label: 'Contact Us', page: 'contact' as Page, angle: 288 },    // Top-Leftish
  ], []);

  // Removed internal video rendering to use persistent video in App.tsx

  return (
    <div className={`min-h-screen relative overflow-hidden ${isCompact ? 'flex items-center justify-center' : ''}`}>
      {/* Full-screen Background Video - Removed from here, handled in App.tsx */}

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0,transparent_70%)] animate-pulse-slow" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-secondary/10 blur-[150px] rounded-full" />
      </div>

      {/* Foreground content */}
      <div className={`relative z-10 ${isCompact ? 'h-full w-full flex items-center justify-center' : 'min-h-screen flex items-center justify-center'}`}>
        <div
          className={`relative transition-all duration-1000 ease-out origin-center
            ${logoLoaded
              ? (isCompact ? 'scale-[0.65] opacity-100' : 'scale-100 opacity-100')
              : 'scale-50 opacity-0'
            }`}
        >
          {/* Glowing Connection Lines */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 overflow-visible">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="lineBuffer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="50%" stopColor="rgba(37, 99, 235, 0.6)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
            </defs>
            {buttons.map((b, i) => {
              const nextIndex = (i + 1) % buttons.length;
              const bNext = buttons[nextIndex];
              const gap = 12; // Gap in degrees to keep lines off the icons

              let startAngle = b.angle + gap;
              let endAngle = bNext.angle - gap;

              if (endAngle < startAngle) endAngle += 360;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 300 + Math.sin(startRad) * distance;
              const y1 = 300 - Math.cos(startRad) * distance;

              const x2 = 300 + Math.sin(endRad) * distance;
              const y2 = 300 - Math.cos(endRad) * distance;

              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} A ${distance} ${distance} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke="url(#lineBuffer)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  className="opacity-80 animate-pulse"
                />
              );
            })}
            {/* Optional: Cross connections for network feel */}
            <path
              d={buttons.map((b, i) => {
                // Connect to the one after the next to create a star pattern
                const nextIndex = (i + 2) % buttons.length;
                const bNext = buttons[nextIndex];

                const angleRad1 = (b.angle * Math.PI) / 180;
                const x1 = 300 + Math.sin(angleRad1) * distance;
                const y1 = 300 - Math.cos(angleRad1) * distance;

                const angleRad2 = (bNext.angle * Math.PI) / 180;
                const x2 = 300 + Math.sin(angleRad2) * distance;
                const y2 = 300 - Math.cos(angleRad2) * distance;

                return `M ${x1} ${y1} L ${x2} ${y2}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(59, 130, 246, 0.15)"
              strokeWidth="1"
              className="opacity-40"
            />
          </svg>

          {/* Center Video Element */}
          <video
            src="/vcas.mp4"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-[0_0_30px_rgba(0,0,0,0.9)] animate-float mix-blend-screen"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Icon ring around the GIF (icons stay in place) */}
          <div className="absolute inset-0">
            {buttons.map((button) => {
              const angleRad = (button.angle * Math.PI) / 180;
              const x = Math.sin(angleRad) * distance;
              const y = -Math.cos(angleRad) * distance;

              return (
                <button
                  key={button.page}
                  onClick={() => onNavigate(button.page)}
                  className="absolute left-1/2 top-1/2 flex flex-col items-center gap-3 text-white font-semibold cursor-pointer group transition-transform duration-300 hover:scale-110"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  aria-label={button.label}
                >
                  <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 border border-primary/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:bg-primary/20 group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300">
                    <button.icon
                      className="w-5 h-5 md:w-7 md:h-7 text-white transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-blue-100/80 group-hover:text-white group-hover:tracking-widest transition-all duration-300 shadow-black drop-shadow-md">
                    {button.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
});

export default LandingPage;
