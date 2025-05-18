
import { useRef, useEffect, useState } from 'react';

interface Partner {
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
}

const partners: Partner[] = [
  {
    name: "Amazon Web Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    tier: "platinum"
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    tier: "platinum"
  },
  {
    name: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    tier: "platinum"
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    tier: "gold"
  },
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_logo.svg",
    tier: "gold"
  },
  {
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    tier: "silver"
  },
  {
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    tier: "gold"
  },
  {
    name: "SAP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
    tier: "silver"
  }
];

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Group partners by tier
  const platinumPartners = partners.filter(p => p.tier === "platinum");
  const goldPartners = partners.filter(p => p.tier === "gold");
  const silverPartners = partners.filter(p => p.tier === "silver");

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-200 dark:to-dark-100">
      <div className="container mx-auto px-4">
        <div 
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-tech-500 uppercase tracking-wider mb-2 inline-block">
            Strategic Partnerships
          </span>
          <h2 className="text-3xl font-bold mb-4">Technology Partners & Alliances</h2>
          <p className="text-gray-600">
            We collaborate with leading technology providers to deliver innovative solutions that drive transformational outcomes for our clients.
          </p>
        </div>

        {platinumPartners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-center text-lg font-medium text-gray-700 mb-8">Platinum Partners</h3>
            <div 
              className={`flex flex-wrap justify-center gap-12 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {platinumPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex justify-center items-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {goldPartners.length > 0 && (
          <div className="mb-10">
            <h3 className="text-center text-lg font-medium text-gray-700 mb-6">Gold Partners</h3>
            <div 
              className={`flex flex-wrap justify-center gap-10 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {goldPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex justify-center items-center"
                  style={{ transitionDelay: `${(platinumPartners.length + index) * 100}ms` }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {silverPartners.length > 0 && (
          <div>
            <h3 className="text-center text-lg font-medium text-gray-700 mb-6">Silver Partners</h3>
            <div 
              className={`flex flex-wrap justify-center gap-8 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {silverPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex justify-center items-center"
                  style={{ transitionDelay: `${(platinumPartners.length + goldPartners.length + index) * 100}ms` }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
