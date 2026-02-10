import React from 'react';

interface NavbarProps {
    onNavigate: (page: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 py-1 shadow-sm">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center">
                    {/* LEFT: Logo & Tagline */}
                    <div
                        className="flex flex-row items-center cursor-pointer group ml-4 gap-3"
                        onClick={() => onNavigate('home')}
                    >
                        <img src="/header.png" alt="VCAS Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
                        <span className="text-[#125ba8] font-bold text-xs tracking-wide group-hover:text-[#0e4886] transition-colors -mt-1">Connecting Business.....</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
