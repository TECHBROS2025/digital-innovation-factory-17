
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { serviceDetails } from "../data/services";
import { ArrowRight } from "lucide-react";
import {
  Code,
  Paintbrush,
  BarChart3,
  Cloud,
  GraduationCap,
  Stethoscope,
  ShoppingCart,
  BrainCircuit,
  ShieldCheck,
  LineChart,
  TrendingUp,
  Bitcoin,
} from "lucide-react";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  // Map category names to URL paths
  const categoryUrls: Record<string, string> = {
    "Development": "services/development",
    "Design": "services/design",
    "Marketing": "services/marketing",
    "Infrastructure": "services/infrastructure",
    "Education": "services/education",
    "Healthcare": "services/healthcare",
    "E-commerce": "services/ecommerce",
    "AI & Data": "services/ai-data",
    "Security": "services/security",
    "Consulting": "services/consulting",
    "Forex Trading": "services/forex",
    "Cryptocurrency": "services/crypto"
  };

  // Map categories to icons
  const categoryIcons: Record<string, any> = {
    "Development": Code,
    "Design": Paintbrush,
    "Marketing": BarChart3,
    "Infrastructure": Cloud,
    "Education": GraduationCap,
    "Healthcare": Stethoscope,
    "E-commerce": ShoppingCart,
    "AI & Data": BrainCircuit,
    "Security": ShieldCheck,
    "Consulting": LineChart,
    "Forex Trading": TrendingUp,
    "Cryptocurrency": Bitcoin,
  };

  // Get unique categories
  const categories = Array.from(new Set(serviceDetails.map(service => service.category)));
  
  // Get a representative service from each category
  const featuredServices = categories.map(category => {
    const serviceForCategory = serviceDetails.find(service => service.category === category);
    if (!serviceForCategory) return null;
    
    return {
      ...serviceForCategory,
      icon: categoryIcons[category] || Code
    };
  }).filter(Boolean);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-20 px-4 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <span className="text-sm font-medium text-vibrant-purple uppercase tracking-wider mb-2 inline-block before-dash">Our Services</span>
          <h2 className="text-4xl font-bold mb-6">Comprehensive <span className="text-vibrant-purple">Tech Solutions</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We offer a wide range of services to help businesses of all sizes leverage technology for growth and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredServices.map((service: any, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.category}
              description={`${service.title} and more solutions for your business needs.`}
              index={index}
              slug={categoryUrls[service.category] || service.category.toLowerCase().replace(/\s+/g, '-')}
              category={service.category}
            />
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Link 
            to="/services"
            className="inline-flex items-center px-6 py-3 bg-vibrant-purple text-white rounded-full hover:bg-vibrant-purple/90 transition-all font-medium"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
