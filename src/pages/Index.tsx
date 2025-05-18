
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Technologies from "../components/Technologies";
import Process from "../components/Process";
import Partners from "../components/Partners";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FeaturesGrid from "../components/FeaturesGrid";
import Newsletter from "../components/Newsletter";
import InnovationStats from "../components/InnovationStats";
import { ArrowRight, Code, Rocket, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [activeSection, setActiveSection] = useState("");
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Update active section for quick navigation
          if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.animate-reveal, .stagger-item, section[id]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Quick jump to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={homeRef} className="flex flex-col min-h-screen w-full bg-gradient-to-b from-gray-50 to-white dark:from-dark-200 dark:to-dark-100">
      <ScrollProgress />
      <Navbar />
      
      {/* Quick Navigation Bar */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm py-2 hidden md:block">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-6 overflow-x-auto scrollbar-none">
            {["services", "about", "features", "technologies", "process", "portfolio", "testimonials", "faq", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                  activeSection === section 
                    ? 'bg-vibrant-purple/10 text-vibrant-purple dark:bg-vibrant-purple/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-vibrant-purple dark:hover:text-vibrant-purple/90'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="flex-grow">
        <Hero />
        
        {/* Mission Statement Banner */}
        <div className="bg-gradient-tech py-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute rounded-full opacity-30"
                  style={{
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    background: `rgba(255, 255, 255, ${Math.random() * 0.5})`,
                    animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl">
                Empowering businesses through innovative technology solutions that transform challenges into opportunities for growth and success.
              </p>
            </div>
          </div>
        </div>
        
        <Services />
        
        <FeaturesGrid />
        
        <InnovationStats />
        
        <Technologies />
        
        <Process />
        
        <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto gap-8 py-20">
          <About />
          <Portfolio />
        </div>
        
        <Partners />
        
        <Newsletter />
        
        <CTABanner />
        
        <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto gap-8 py-20">
          <Testimonials />
          <FAQ />
        </div>
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
