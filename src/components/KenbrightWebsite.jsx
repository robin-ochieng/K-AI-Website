import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Brain, BookOpen, Gamepad2, Users, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Menu, X, ArrowRight, Sparkles, Zap, Target, Award, Network, Shield, Globe, ChevronDown } from 'lucide-react';
import whatWeDoBackground from '../assets/whatWeDoBackground2.jpg';
import whatWeDoBackground3 from '../assets/whatWeDoBackground1.jpg';

// CountUp component
const CountUp = ({ end, duration, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  
  // Handle the delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Start counting after delay
  useEffect(() => {
    if (!shouldStart) return;
    
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [end, duration, shouldStart]);
  
  return <span>{count}</span>;
};

// Custom hook for Games Section Background Animation
const useGamesBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle class for floating orbs
    class GlowingOrb {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000; // Depth
        this.size = Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.vz = (Math.random() - 0.5) * 0.5;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = {
          r: 100 + Math.random() * 100, // Blue range
          g: 150 + Math.random() * 105, // Cyan range
          b: 255
        };
      }
      
      update() {
        // Movement
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        
        // Boundary check with smooth wrapping
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;
        
        // Pulsing effect
        this.pulsePhase += this.pulseSpeed;
        const scale = 1 + Math.sin(this.pulsePhase) * 0.2;
        this.size = this.baseSize * scale * (1 - this.z / 1000);
      }
      
      draw() {
        const perspective = 1 - this.z / 1000;
        const opacity = perspective * 0.8;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core orb
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const orbs = [];
    const orbCount = 30; // Fewer particles for better performance
    
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new GlowingOrb());
    }
    
    // Animation loop
    let animationId;
    const animate = () => {
      // Clear canvas with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Sort orbs by z-index for proper depth rendering
      orbs.sort((a, b) => b.z - a.z);
      
      // Draw connections
      orbs.forEach((orb, i) => {
        orbs.forEach((orb2, j) => {
          if (i !== j) {
            const dx = orb.x - orb2.x;
            const dy = orb.y - orb2.y;
            const dz = Math.abs(orb.z - orb2.z);
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distance < 200) {
              const opacity = (1 - distance / 200) * 0.3 * (1 - orb.z / 1000);
              ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(orb.x, orb.y);
              ctx.lineTo(orb2.x, orb2.y);
              ctx.stroke();
            }
          }
        });
      });
      
      // Update and draw orbs
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return canvasRef;
};

const KenbrightWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);
  const [isGamesSectionVisible, setIsGamesSectionVisible] = useState(false);
  
  // Enhanced typing effect with multiple phrases
  const phrases = ['Intelligent Solutions', 'AI-Powered Automation', 'Enterprise Innovation'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Schedule Demo Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    date: '',
    time: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);  

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
            // Check if it's the games section
            if (entry.target.id === 'games') {
              setIsGamesSectionVisible(true);
            }
          } else {
            if (entry.target.id === 'games') {
              setIsGamesSectionVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Add Inter font for more professional look
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = '"Inter", sans-serif';
  }, []);

  // Advanced typing animation
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText !== currentPhrase) {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      } else if (isDeleting && typedText.length > 1) { // Keep at least 1 character
        setTypedText(typedText.slice(0, -1));
      } else if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && typedText.length <= 1) { // Switch when almost empty
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypedText(phrases[(phraseIndex + 1) % phrases.length].slice(0, 1)); // Start with first char
      }
    }, isDeleting ? 80 : 150);
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex, phrases]);

  // Neural network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.5)';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${0.15 * (1 - distance / 150)})`;
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = ['Home', 'What We Do', 'Games', 'Training', 'Contact'];

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Solutions",
      description: "Cutting-edge artificial intelligence solutions tailored for your business needs",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Digital Innovation",
      description: "Transform your business with innovative digital strategies and technologies",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Tools",
      description: "Interactive learning platforms and training modules for professional development",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting Services",
      description: "Expert guidance to navigate complex regulatory and technological landscapes",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const trainingModules = [
    {
      title: "IFRS 17 Training Module - NBFIRA",
      description: "Comprehensive IFRS 17 training designed for regulatory compliance and best practices",
      link: "https://kenbright-ifrs-17-modules.share.connect.posit.cloud",
      icon: <Award className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "IFRS 17 Training Module - IRA", 
      description: "Advanced insurance regulation training with practical applications and case studies",
      link: "https://ira-kenbright.shinyapps.io/IFRS17TrainingModules/",
      icon: <Shield className="w-6 h-6" />,
      color: "from-cyan-500 to-teal-500"
    },
    {
      title: "Retirement Tool", 
      description: "Explore our suite of five intelligent financial calculators designed to support smarter planning across retirement, investments, estate, and personal financial goals.",
      link: "https://kenbright-retirement-tool.share.connect.posit.cloud",
      icon: <Globe className="w-6 h-6" />,
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-slate-900/50 border-b border-slate-800' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Kenbright AI
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Schedule Demo
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden bg-slate-900/95 backdrop-blur-md`}>
          <div className="px-4 py-2 space-y-2 border-t border-slate-800">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block py-2 font-medium text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Sophisticated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        {/* Neural network canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 opacity-30"
        />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          />
          <div 
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"
            style={{ 
              animationDelay: '1s',
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` 
            }}
          />
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rotate-12 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          {/* Premium badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">Enterprise AI Platform</span>
          </div>          
          {/* Main heading */}
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="block text-white/90 mb-2">Empowering Tomorrow with</span>
            <span className="block relative h-[1.2em] md:h-[1.2em] lg:h-[1.2em]">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient-x whitespace-nowrap">
                {typedText}
              </span>
              <span className="absolute -right-4 top-0 text-blue-400 animate-pulse">|</span>
            </span>
          </h1>
          
          {/* Enhanced subtext with improved typography and animations */}
          <p className={`text-lg md:text-xl text-gray-300 max-w-[70ch] mx-auto mb-12 leading-snug transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} motion-safe:animate-fade-in-up`}>
            Transform your enterprise with{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 transition-all duration-300">
              AI-powered automation
            </span>
            ,{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300">
              intelligent agents
            </span>
            , and{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 transition-all duration-300">
              next-generation solutions
            </span>{' '}
            designed for the finance and insurance sectors.
          </p>
          
          {/* Enhanced Trust indicators with glass-morphism cards */}
          <div className={`flex flex-wrap justify-center gap-4 md:gap-6 mb-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Advanced AI Agents */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">Advanced AI Agents</span>
                </div>
              </div>
            </div>

            {/* Enterprise Integration */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg">
                    <Network className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">Enterprise Integration</span>
                </div>
              </div>
            </div>

            {/* IFRS 17 Certified */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-teal-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-lg">
                    <Shield className="w-5 h-5 text-teal-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-200">IFRS 17 Certified</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Premium CTAs */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a href="#what-we-do" className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a href="#contact" className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 bg-slate-800/50 backdrop-blur-md relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url(${whatWeDoBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900/80" />          
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Delivering excellence through innovative technology and expert knowledge
            </p>
          </div>

          {/* Stats counter with sequential animation */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 ${
            visibleSections.has('what-we-do') ? 'opacity-100' : 'opacity-0'
             }`}>
            <div className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 transform transition-all duration-700 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={15} duration={2} delay={0} />}+
              </div>
              <p className="text-gray-400">Clients Served</p>
            </div>
            
            <div className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 transform transition-all duration-700 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={50} duration={2} delay={500} />}+
              </div>
              <p className="text-gray-400">AI Solutions</p>
            </div>
            
            <div className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 transform transition-all duration-700 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400 mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={98} duration={2} delay={1000} />}%
              </div>
              <p className="text-gray-400">Success Rate</p>
            </div>
            
            <div className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-lg border border-slate-700 transform transition-all duration-700 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={24} duration={2} delay={1500} />}/7
              </div>
              <p className="text-gray-400">Support</p>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            // Unique hover effects for each card
            const hoverEffects = [
              'group-hover:rotate-[360deg]',
              'group-hover:scale-125',
              'group-hover:-translate-y-2',
              'group-hover:rotate-12'
            ];

            return (
              <div
                key={index}
                className={`group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-transparent transition-all duration-700 transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden ${
                  visibleSections.has('what-we-do') 
                    ? 'animate-slide-up opacity-100' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-all duration-700`}></div>
                
                <div className="relative z-10">
                  {/* Enhanced icon container */}
                  <div className="relative mb-6 inline-block">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
                    
                    {/* Icon box with gradient border */}
                    <div className={`relative w-20 h-20 p-[2px] bg-gradient-to-br ${service.gradient} rounded-2xl group-hover:rounded-3xl transition-all duration-700`}>
                      <div className="w-full h-full bg-slate-900 rounded-2xl group-hover:rounded-3xl flex items-center justify-center">
                        <div className={`${service.gradient.includes('blue') ? 'text-blue-400' : service.gradient.includes('cyan') ? 'text-cyan-400' : service.gradient.includes('teal') ? 'text-teal-400' : 'text-purple-400'} transition-all duration-700 ${hoverEffects[index]}`}>
                          {service.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative dots */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Optional: Add arrow link */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className={`inline-flex items-center gap-2 text-sm font-medium ${service.gradient.includes('blue') ? 'text-blue-400' : service.gradient.includes('cyan') ? 'text-cyan-400' : service.gradient.includes('teal') ? 'text-teal-400' : 'text-purple-400'}`}>
                      {/* Learn more */}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
                
                {/* Bottom gradient bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Animated background canvas */}
        <canvas 
          ref={useGamesBackground()} 
          className="absolute inset-0 opacity-60"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Existing gradient orb */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        
        {/* Additional ambient lighting */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-96 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Interactive Learning Games
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Engage with our innovative educational games designed to make learning enjoyable and effective
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={`relative bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-slate-700 ${
              visibleSections.has('games') 
                ? 'animate-float opacity-100' 
                : 'opacity-0 scale-90'
            }`}>
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 -z-10"></div>
              
              {/* Corner accent animations */}
              <div className="absolute top-0 left-0 w-20 h-20">
                <div className="absolute top-2 left-2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-500"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20">
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-teal-400 rounded-full animate-ping animation-delay-1000"></div>
              </div>
              
              {/* Game card content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  {/* Animated game controller icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg transform transition-all duration-300 hover:rotate-12 hover:scale-110 animate-bounce-slow">
                      <Gamepad2 className="w-8 h-8 text-white animate-wiggle" />
                    </div>
                    {/* Floating particles around icon */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-float-particle"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-float-particle animation-delay-500"></div>
                  </div>
                  
                  {/* Enhanced Available Now badge */}
                  <div className="relative">
                    <span className="relative bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm flex items-center gap-2 animate-pulse-glow">
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-400 rounded-full blur-xl opacity-40 animate-pulse"></span>
                      <span className="relative">Available Now</span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400">
                  IFRS 17 Interactive Game
                </h3>
                
                {/* Progress bar animation */}
                <div className="h-1 bg-slate-700 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full animate-progress-bar"></div>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Master complex IFRS 17 concepts through an engaging, gamified learning experience. Test your knowledge, earn points, and track your progress.
                </p>
                
                {/* Enhanced Play Now button */}
                <div className="relative inline-block">
                  <a 
                    href="https://ifrs-17-training-game.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 overflow-hidden">
                    
                    {/* Button shine effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    
                    <span className="relative">Play Now</span>
                    <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform group-hover:animate-bounce-x" />
                  </a>
                  
                  {/* Orbiting particles around button */}
                  <div className="absolute -inset-4 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-blue-400 rounded-full animate-orbit"></div>
                    <div className="absolute top-1/2 right-0 w-1 h-1 bg-cyan-400 rounded-full animate-orbit animation-delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section id="training" className="py-20 bg-slate-800/50 backdrop-blur-md relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `url(${whatWeDoBackground3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />      
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900/80" />          
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Professional Training Modules
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry-leading courses designed by experts for enterprise professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trainingModules.map((module, index) => {
              // Unique animations for each card
              const cardAnimations = [
                'hover:rotate-y-5', // 3D perspective rotation
                'hover:-rotate-y-5', // Opposite rotation
                'hover:translate-z-10' // Z-axis movement
              ];
              
              const iconAnimations = [
                'group-hover:rotate-[360deg]',
                'group-hover:scale-110 group-hover:-rotate-12',
                'group-hover:translate-y-[-4px]'
              ];

              return (
                <div
                  key={index}
                  className={`group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-slate-700 transform hover:scale-105 ${
                    visibleSections.has('training') 
                      ? 'animate-slide-up opacity-100' 
                      : 'opacity-0 translate-y-10'
                  } ${cardAnimations[index]}`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-all duration-700 transform scale-150 group-hover:scale-100`}></div>
                  
                  {/* Floating orbs background */}
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className={`absolute top-10 right-10 w-20 h-20 bg-gradient-to-br ${module.color} rounded-full blur-2xl animate-float-slow`}></div>
                    <div className={`absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br ${module.color} rounded-full blur-2xl animate-float-slow animation-delay-1000`}></div>
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between mb-6">
                      {/* Enhanced icon container */}
                      <div className="relative">
                        {/* Icon glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${module.color} rounded-lg blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-pulse-slow`}></div>
                        
                        {/* Icon box */}
                        <div className={`relative p-3 bg-gradient-to-br ${module.color} rounded-lg transition-all duration-700 ${iconAnimations[index]}`}>
                          <div className="text-white">
                            {module.icon}
                          </div>
                          
                          {/* Icon decoration */}
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                        </div>
                      </div>
                      
                      {/* Professional badge with animation */}
                      <span className="relative text-sm font-semibold text-gray-500 bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full overflow-hidden group-hover:text-gray-300 transition-colors duration-300">
                        <span className="relative z-10">Professional</span>
                        <span className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></span>
                      </span>
                    </div>
                    
                    {/* Title with hover effect */}
                    <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                      {module.title}
                    </h3>
                    
                    {/* Description with fade-in */}
                    <p className="text-gray-400 mb-6 transition-all duration-300 group-hover:text-gray-300">
                      {module.description}
                    </p>
                    
                    {/* Enhanced access link */}
                    <a
                      href={module.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold transition-all duration-300 group/link hover:gap-4 relative"
                    >
                      <span className="relative text-blue-400 group-hover/link:text-cyan-400 transition-colors duration-300">
                        Access Module
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowRight className="w-5 h-5 text-blue-400 transition-all duration-300 group-hover/link:translate-x-2 group-hover/link:text-cyan-400" />
                    </a>
                  </div>
                  
                  {/* Enhanced bottom progress bar */}
                  <div className="relative h-2 bg-slate-800 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${module.color} transform origin-left transition-all duration-700`}>
                      {/* Animated shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                    </div>
                    {/* Progress fill animation */}
                    <div className={`h-full bg-gradient-to-r ${module.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                  </div>
                  
                  {/* Corner accent animation */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${module.color} opacity-5 transform translate-x-16 -translate-y-16 rotate-45 group-hover:translate-x-12 group-hover:-translate-y-12 group-hover:opacity-10 transition-all duration-700`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Kenbright AI
              </h3>
              <p className="text-gray-400 mb-6">
                Empowering businesses with intelligent solutions and innovative technology for a smarter tomorrow.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 border border-slate-700 hover:border-transparent transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 border border-slate-700 hover:border-transparent transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-800/50 backdrop-blur-sm rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 border border-slate-700 hover:border-transparent transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:translate-x-1 inline-block">Sitemap</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">info@kenbright.africa</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30 backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-400">+254 709 783 000</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/30 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-400">26th floor, Prism Towers, Nairobi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Kenbright AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
          will-change: background-position;
        }

        h1 {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }          
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .group-hover\\:rotate-\\[360deg\\] {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @supports (transform-style: preserve-3d) {
          .hover\\:rotate-1:hover {
            transform: translateY(-12px) rotateX(-2deg) rotateY(2deg);
          }
          
          .hover\\:-rotate-1:hover {
            transform: translateY(-12px) rotateX(-2deg) rotateY(-2deg);
          }
          
          .hover\\:skew-y-1:hover {
            transform: translateY(-12px) skewY(1deg);
          }
          
          .hover\\:-skew-y-1:hover {
            transform: translateY(-12px) skewY(-1deg);
          }
        }          

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        @keyframes float-particle {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(20px, -20px);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
          }
        }

        @keyframes progress-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 3s ease-out infinite;
        }

        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 4s linear infinite;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animation-delay-1500 {
          animation-delay: 1500ms;
        }

        /* 3D rotation effects */
        .hover\\:rotate-y-5:hover {
          transform: perspective(1000px) rotateY(5deg) scale(1.05);
        }

        .hover\\:-rotate-y-5:hover {
          transform: perspective(1000px) rotateY(-5deg) scale(1.05);
        }

        .hover\\:translate-z-10:hover {
          transform: perspective(1000px) translateZ(10px) scale(1.05);
        }

        /* Smooth transitions for 3D effects */
        .group {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }      

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
                  
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up {
            animation: none;
          }
          
          .hover\\:-translate-y-0\\.5:hover {
            transform: none;
          }
        }          
      `}</style>

      {/* Schedule Demo Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsScheduleModalOpen(false);
              setCurrentFormStep(1);
              setIsFormSubmitted(false);
            }}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl" />
            
            {/* Glass effect container */}
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 md:p-10">
              {/* Close button */}
              <button
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  setCurrentFormStep(1);
                  setIsFormSubmitted(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              {!isFormSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 animate-pulse-slow">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3">
                      Book Your Personalized AI Demo
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto">
                      See how our AI agents can transform your operations in a 30-minute guided session tailored to your industry needs.
                    </p>
                  </div>
                  
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                            currentFormStep >= step
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                              : 'bg-slate-700 text-gray-400'
                          }`}>
                            {step}
                          </div>
                          {step < 3 && (
                            <div className={`w-16 h-1 transition-all duration-300 ${
                              currentFormStep > step
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                : 'bg-slate-700'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  
                  {/* Form Steps */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (currentFormStep < 3) {
                      setCurrentFormStep(currentFormStep + 1);
                    } else {
                      // Handle form submission
                      setIsFormSubmitted(true);
                      // Here you would normally send the data to your backend
                      console.log('Form submitted:', formData);
                    }
                  }}>
                    {/* Step 1: Personal Information */}
                    {currentFormStep === 1 && (
                      <div className="space-y-6 animate-slide-up">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Company Information */}
                    {currentFormStep === 2 && (
                      <div className="space-y-6 animate-slide-up">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            placeholder="Acme Corporation"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Industry
                          </label>
                          <select
                            required
                            value={formData.industry}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          >
                            <option value="">Select your industry</option>
                            <option value="insurance">Insurance</option>
                            <option value="finance">Finance & Banking</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="technology">Technology</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {/* Step 3: Schedule */}
                    {currentFormStep === 3 && (
                      <div className="space-y-6 animate-slide-up">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preferred Time
                          </label>
                          <select
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          >
                            <option value="">Select a time slot</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Timezone
                          </label>
                          <div className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-gray-400">
                            {formData.timezone}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Form Actions */}
                    <div className="flex gap-4 mt-8">
                      {currentFormStep > 1 && (
                        <button
                          type="button"
                          onClick={() => setCurrentFormStep(currentFormStep - 1)}
                          className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all duration-200"
                        >
                          Previous
                        </button>
                      )}
                      
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {currentFormStep === 3 ? 'Schedule Demo' : 'Next'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-12 animate-scale-in">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 animate-bounce-slow">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">Demo Scheduled Successfully!</h3>
                  <p className="text-gray-400 mb-6">
                    We've sent a confirmation email to <span className="text-blue-400">{formData.email}</span>
                  </p>
                  <p className="text-gray-400 mb-8">
                    Your demo is scheduled for <span className="text-cyan-400">{formData.date}</span> at <span className="text-cyan-400">{formData.time}</span>
                  </p>
                  
                  <button
                    onClick={() => {
                      setIsScheduleModalOpen(false);
                      setCurrentFormStep(1);
                      setIsFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        industry: '',
                        date: '',
                        time: '',
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                      });
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default KenbrightWebsite;