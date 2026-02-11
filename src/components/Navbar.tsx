import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    onNavigate: (page: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationItems = [
        { name: 'Home', page: 'home' },
        { name: 'About', page: 'about' },
        { name: 'Services', page: 'services' },
        { name: 'Careers', page: 'career' },
        { name: 'Contact', page: 'contact' },
    ];

    return (
        <>
            {/* Desktop Logo Only */}
            <div className="hidden md:flex fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 py-2 shadow-sm">
                <div className="container mx-auto px-6 flex justify-start items-center">
                    <div
                        className="flex flex-row items-center cursor-pointer group gap-3"
                        onClick={() => onNavigate('home')}
                    >
                        <img src="/header.png" alt="VCAS Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
                        <span className="text-[#125ba8] font-bold text-xs tracking-wide group-hover:text-[#0e4886] transition-colors -mt-1">Connecting Business.....</span>
                    </div>
                </div>
            </div>

            {/* Mobile Full Navbar */}
            <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 py-1 shadow-sm">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center">
                        {/* LEFT: Logo & Tagline */}
                        <div
                            className="flex flex-row items-center cursor-pointer group ml-4 gap-3"
                            onClick={() => onNavigate('home')}
                        >
                            <img src="/header.png" alt="VCAS Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
                            <span className="text-[#125ba8] font-bold text-xs tracking-wide group-hover:text-[#0e4886] transition-colors -mt-1 hidden sm:block">Connecting Business.....</span>
                        </div>
                    </div>

                    {/* MOBILE: Menu Button */}
                    <button
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* MOBILE: Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
                        <div className="container mx-auto px-6 py-4">
                            <div className="flex flex-col space-y-3">
                                {navigationItems.map((item) => (
                                    <button
                                        key={item.page}
                                        onClick={() => {
                                            onNavigate(item.page);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-left text-gray-700 hover:text-primary font-medium transition-colors duration-200 py-2 text-base"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
