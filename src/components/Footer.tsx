import React from 'react';
import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-navy pt-20 pb-10 overflow-hidden text-left border-t border-navy-light">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 items-start">
                    {/* Column 1 - Company Branding */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                            <img src="/Logo.png" alt="VCAS Logo" className="h-20 w-auto rounded-lg object-contain bg-white p-1" />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                            Premier bridge between India and Japan, empowering organizations with innovative, bilingual IT and business solutions.
                        </p>
                        <div className="flex gap-4 mt-auto">
                            <a href="#" className="w-10 h-10 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:shadow-md transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:shadow-md transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-navy-light border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:shadow-md transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Home</button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">About</button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('services')} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Services</button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('career')} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Careers</button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-primary transition-colors text-sm font-medium">Contact</button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Services */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Services</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium" onClick={() => onNavigate('services')}>IT Consulting Business</li>
                            <li className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium" onClick={() => onNavigate('services')}>E-Commerce Planning</li>
                            <li className="text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium" onClick={() => onNavigate('services')}>HR Consulting</li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold text-lg">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-400 text-xs">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <span className="whitespace-nowrap">business@vcasconsulting.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>044-400-1821</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <p className="leading-[1.8]">
                                    Kanagawa-ken,<br />
                                    Kawasaki-shi,<br />
                                    Kawasaki-ku,<br />
                                    Shimonamiki <br />11-5-4-809
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} VCAS 合同会社. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
