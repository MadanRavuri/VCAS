import { useState, useCallback, useEffect, useRef, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

// Lazy load components and pages
const BackgroundVideo = lazy(() => import('./components/BackgroundVideo'));
const ChatBot = lazy(() => import('./components/ChatBot'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const ApplicationPage = lazy(() => import('./pages/ApplicationPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <span className="text-gray-600">Loading...</span>
    </div>
  </div>
);

type Page = 'home' | 'landing' | 'career' | 'about' | 'contact' | 'services' | 'service-detail' | 'application';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [initialPosition, setInitialPosition] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateTo = useCallback((page: Page, position: string = '') => {
    if (page === currentPage || isTransitioning) return;

    if (page === 'application') {
      setInitialPosition(position || 'General Application');
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      // Only scroll the right panel, not the whole page
      const rightPanel = document.getElementById('right-panel');
      if (rightPanel) {
        rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  }, [currentPage, isTransitioning]);

  // Create a stable reference for navigation to prevent LandingPage re-renders
  const navigateToRef = useRef(navigateTo);
  useEffect(() => {
    navigateToRef.current = navigateTo;
  }, [navigateTo]);

  const stableNavigate = useCallback((page: Page) => {
    navigateToRef.current(page);
  }, []);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    navigateTo('service-detail');
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Suspense fallback={<PageLoader />}>
            <HomePage onNavigate={navigateTo} />
          </Suspense>
        );
      case 'landing':
        return (
          <Suspense fallback={<PageLoader />}>
            <LandingPage
              key="landing-page-persistent"
              onNavigate={stableNavigate}
              isCompact={!isLanding}
            />
          </Suspense>
        );
      case 'about':
        return (
          <Suspense fallback={<PageLoader />}>
            <AboutPage onNavigate={navigateTo} />
          </Suspense>
        );
      case 'career':
        return (
          <Suspense fallback={<PageLoader />}>
            <CareerPage onNavigate={navigateTo} />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        );
      case 'services':
        return (
          <Suspense fallback={<PageLoader />}>
            <ServicesPage onNavigate={navigateTo} onServiceSelect={handleServiceSelect} />
          </Suspense>
        );
      case 'service-detail':
        return (
          <Suspense fallback={<PageLoader />}>
            <ServiceDetailPage
              service={selectedService}
              onBack={() => navigateTo('services')}
              onNavigate={navigateTo}
            />
          </Suspense>
        );
      case 'application':
        return (
          <Suspense fallback={<PageLoader />}>
            <ApplicationPage onNavigate={navigateTo} initialPosition={initialPosition} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  // UNIFIED RENDER STRUCTURE:
  // We use a single return statement to ensure the LandingPage component (and its video)
  // never unmounts when switching between 'landing' and other pages.
  // Instead, we manipulate its layout and position using CSS classes.

  const isLanding = currentPage === 'landing';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/*
        PERSISTENT LANDING PAGE LAYER (Left Panel)
        - On Mobile: Hidden if not on landing page.
        - On Desktop:
          - If isLanding:  Fixed inset-0 (Full Screen)
          - If !isLanding: Fixed LEFT-0 top-0 bottom-0 w-[35%] (Side Panel)

        This prevents the video from reloading/resetting when navigating.
      */}
      <div
        key="persistent-left-panel"
        className={`
          transition-all duration-700 ease-in-out z-20 will-change-transform
          ${isLanding
            ? 'fixed inset-0 w-full h-full'
            : `fixed left-0 top-0 bottom-0 lg:w-[32%] w-full h-full shadow-2xl z-30 ${isMobile ? 'hidden pointer-events-none' : 'block'}`
          }
        `}
      >
        {/* Persistent Video Wrapper - Decoupled from LandingPage component to prevent re-renders */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <Suspense fallback={<div className="absolute inset-0 bg-navy" />}>
            <BackgroundVideo
              src="/vcas_landing_page_video.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </Suspense>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        <LandingPage
          key="landing-page-persistent"
          onNavigate={stableNavigate}
          isCompact={!isLanding}
        />
      </div>

      {/* Global Navbar */}
      {!isLanding && <Navbar onNavigate={stableNavigate} />}

      {/*
        CONTENT LAYER (Right Panel - Main Website Pages)
        - Only visible when NOT on landing page.
        - On Desktop: Absolute RIGHT-0 w-[65%]
      */}
      {!isLanding && (
        <div
          id="right-panel"
          className={`
            absolute top-0 right-0 h-full overflow-y-auto z-10 custom-scrollbar touch-pan-y
            transition-opacity duration-500
            ${isMobile ? 'w-full left-0' : 'w-[65%]'}
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <Layout currentPage={currentPage} onNavigate={stableNavigate}>
            {isTransitioning && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-300">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase animate-pulse">Loading...</span>
                </div>
              </div>
            )}

            {renderMainContent()}
          </Layout>
        </div>
      )}

      {/* Persistent ChatBot */}
      <Suspense fallback={null}>
        <ChatBot onNavigate={stableNavigate} />
      </Suspense>

    </div>
  );
}

export default App;
