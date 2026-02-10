import React, { useEffect } from 'react';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    currentPage: string;
    onNavigate: (page: any) => void;
}



const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
            <main className="flex-grow pt-24">
                {children}
            </main>
            <Footer onNavigate={onNavigate} />

            {/* Global Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0,transparent_70%)] animate-pulse-slow" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />
            </div>
        </div>
    );
};

export default Layout;
