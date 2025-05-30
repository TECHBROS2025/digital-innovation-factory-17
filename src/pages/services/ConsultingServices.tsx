
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serviceDetails } from "../../data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ServiceCard from "@/components/ServiceCard";
import SubCategoryList from "@/components/SubCategoryList";

const ConsultingServices = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Filter services by Consulting category
  const services = serviceDetails.filter(service => service.category === "Consulting");
  
  // Use the actual slug from the first Consulting service
  const mainServiceSlug = services.length > 0 ? services[0].slug : 'business-consulting';
  
  // Get all subcategories
  const allSubcategories = services.flatMap(service => service.subcategories || []);
  
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section - Updated with better image and contrast */}
        <section 
          className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-teal-600/95 to-teal-900/95 text-white"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/services" className="text-teal-100 hover:text-white mb-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                All Services
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Consulting Services</h1>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Strategic guidance and expert advice to help you navigate the complex digital landscape.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription}
                  slug={service.slug}
                  index={index}
                  image={service.image}
                  category={service.category}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Subcategories Section - Using mainServiceSlug to ensure proper linking */}
        {allSubcategories.length > 0 && (
          <SubCategoryList serviceSlug={mainServiceSlug} subcategories={allSubcategories} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultingServices;
