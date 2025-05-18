
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Rocket, Shield } from 'lucide-react';

const CTABanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current);
    };
  }, []);

  return (
    <section 
      ref={bannerRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-vibrant-purple to-vibrant-blue z-0"></div>
      <div className="absolute top-0 right-0 w-full h-full">
        <svg viewBox="0 0 1440 578" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 h-full opacity-20">
          <path d="M1171.05 577.497C1309.41 575.107 1440 451.991 1440 451.991V0H-205V451.991C-205 451.991 86.2313 462.565 262.453 407.52C438.675 352.476 578.599 330.88 706.119 361.293C833.638 391.706 1032.7 579.887 1171.05 577.497Z" fill="white"/>
        </svg>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-display">
                Ready to Transform Your Business with Technology?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's discuss how our innovative solutions can help you achieve your business goals and stay ahead of the competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/#contact"
                  className="px-8 py-4 bg-white text-vibrant-purple rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg font-medium inline-flex items-center justify-center group"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.querySelector("#contact");
                    if (contactSection) {
                      window.scrollTo({
                        top: contactSection.getBoundingClientRect().top + window.pageYOffset - 100,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  Schedule a Consultation
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/portfolio"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 hover:shadow-lg font-medium inline-flex items-center justify-center"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    icon: Code, 
                    title: "Custom Development", 
                    text: "Tailored software solutions for your unique business needs." 
                  },
                  { 
                    icon: Rocket, 
                    title: "Digital Transformation", 
                    text: "Accelerate growth with our innovative technology approach." 
                  },
                  { 
                    icon: Shield, 
                    title: "Enterprise Security", 
                    text: "Protect your business with our advanced security solutions." 
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="mr-4 p-2 bg-white/20 rounded-lg text-white">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
