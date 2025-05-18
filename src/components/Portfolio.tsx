
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { ArrowRight, ChevronRight, Filter } from "lucide-react";

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [category, setCategory] = useState<string>("all");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
    };
  }, []);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "Mobile App", label: "Mobile Apps" },
    { id: "Web Development", label: "Web Development" },
    { id: "Software Development", label: "Software" },
    { id: "Data Visualization", label: "Data & Analytics" },
    { id: "Enterprise Solution", label: "Enterprise" },
    { id: "Cybersecurity", label: "Security" },
    { id: "AI & Machine Learning", label: "AI & ML" },
  ];

  const filteredProjects = category === "all" 
    ? projects 
    : projects.filter(project => project.category === category);

  const showAllProjects = () => {
    setVisibleProjects(projects.length);
  };

  const toggleCategoryMenu = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  return (
    <section id="portfolio" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-tech-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <div 
          ref={titleRef}
          className={`max-w-3xl mx-auto text-center mb-10 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-tech-600 uppercase tracking-wider mb-2 inline-block before-dash">
            Our Work
          </span>
          <h2 className="section-title">Featured <span className="title-highlight">Projects</span></h2>
          <p className="text-gray-600 mt-4 text-pretty max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries, demonstrating our expertise and the measurable impact we've delivered.
          </p>

          {/* Mobile category filter dropdown */}
          <div className="md:hidden relative mt-6">
            <button
              onClick={toggleCategoryMenu}
              className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <span className="flex items-center">
                <Filter size={16} className="mr-2" />
                {categories.find(cat => cat.id === category)?.label || 'All Projects'}
              </span>
              <ChevronRight size={16} className={`transition-transform ${showCategoryMenu ? 'rotate-90' : ''}`} />
            </button>
            
            {showCategoryMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      setShowCategoryMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                      category === cat.id 
                        ? "bg-vibrant-purple/10 text-vibrant-purple"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop category filters */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  category === cat.id
                    ? "bg-vibrant-purple text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard
                key={project.id}
                image={project.mainImage}
                title={project.title}
                category={project.category}
                slug={project.slug}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h3 className="text-xl text-gray-600">No projects found in this category.</h3>
            <button 
              onClick={() => setCategory("all")}
              className="mt-4 px-4 py-2 text-vibrant-purple border border-vibrant-purple/20 rounded-full hover:bg-vibrant-purple/10"
            >
              View all projects
            </button>
          </div>
        )}

        {filteredProjects.length > visibleProjects && (
          <div className="text-center mt-10">
            <button
              onClick={showAllProjects}
              className="px-6 py-3 bg-vibrant-purple/10 border border-vibrant-purple/20 text-vibrant-purple rounded-full hover:bg-vibrant-purple/20 transition-all font-medium"
            >
              Load More Projects
            </button>
          </div>
        )}

        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <Link 
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-vibrant-purple text-white rounded-full hover:bg-vibrant-purple/90 transition-all font-medium group"
          >
            View All Projects
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
