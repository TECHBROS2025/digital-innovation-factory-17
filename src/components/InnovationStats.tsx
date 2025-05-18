
import { useEffect, useState, useRef } from 'react';
import { Rocket, Award, Code, Users, Lightbulb } from 'lucide-react';

const stats = [
  {
    value: 500,
    label: "Projects Completed",
    icon: Code,
    color: "from-vibrant-purple to-indigo-600"
  },
  {
    value: 98,
    label: "Client Satisfaction",
    suffix: "%",
    icon: Users,
    color: "from-vibrant-blue to-cyan-500"
  },
  {
    value: 15,
    label: "Years Experience",
    icon: Award,
    color: "from-vibrant-pink to-red-500"
  },
  {
    value: 42,
    label: "Innovation Patents",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-600"
  },
  {
    value: 24,
    label: "Countries Served",
    icon: Rocket,
    color: "from-emerald-500 to-green-600"
  }
];

const InnovationStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

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

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000; // Animation duration in ms
        const framesPerSecond = 60;
        const totalFrames = duration / 1000 * framesPerSecond;
        const increment = stat.value / totalFrames;
        let currentFrame = 0;
        let currentValue = 0;

        const animate = () => {
          if (currentFrame < totalFrames) {
            currentValue += increment;
            setAnimatedValues(prev => {
              const updated = [...prev];
              updated[index] = Math.round(currentValue);
              return updated;
            });
            currentFrame++;
            requestAnimationFrame(animate);
          } else {
            // Ensure final value is exact
            setAnimatedValues(prev => {
              const updated = [...prev];
              updated[index] = stat.value;
              return updated;
            });
          }
        };

        requestAnimationFrame(animate);
      });
    }
  }, [isVisible]);

  return (
    <section ref={statsRef} className="py-20 bg-white dark:bg-dark-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-vibrant-purple">Impact</span> in Numbers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Driving innovation and delivering exceptional results across industries worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  <stat.icon size={28} />
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-vibrant-purple to-vibrant-blue bg-clip-text text-transparent">
                  {animatedValues[index]}{stat.suffix || ''}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationStats;
