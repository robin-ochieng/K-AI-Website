// Save this file as: src/components/KenbrightWebsite.jsx

import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, BookOpen, Gamepad2, Users, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Menu, X, ArrowRight, Sparkles, Zap, Target, Award } from 'lucide-react';

// CountUp component defined outside
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
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
  }, [end, duration]);
  
  return <span>{count}</span>;
};

const KenbrightWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Added this missing state
  const fullText = 'Intelligent Solutions';

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

  // Add Google Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = '"Nunito Sans", sans-serif';
  }, []);

  // Add typing animation
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Add mouse parallax
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
      description: "Cutting-edge artificial intelligence solutions tailored for your business needs"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Digital Innovation",
      description: "Transform your business with innovative digital strategies and technologies"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Tools",
      description: "Interactive learning platforms and training modules for professional development"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting Services",
      description: "Expert guidance to navigate complex regulatory and technological landscapes"
    }
  ];

  const trainingModules = [
    {
      title: "IFRS 17 Training Module - NBFIRA",
      description: "Comprehensive IFRS 17 training designed for regulatory compliance and best practices",
      link: "https://kenbright-ifrs-17-modules.share.connect.posit.cloud",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "IFRS 17 Training Module - IRA", 
      description: "Advanced insurance regulation training with practical applications and case studies",
      link: "https://ira-kenbright.shinyapps.io/IFRS17TrainingModules/",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Retirement Tool", 
      description: "Explore our suite of five intelligent financial calculators designed to support smarter planning across retirement, investments, estate, and personal financial goals.",
      link: "https://kenbright-retirement-tool.share.connect.posit.cloud",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50' 
          : 'bg-white/10 backdrop-blur-md border-b border-white/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-[#0137A6]' : 'text-white'
              }`}>
                Kenbright AI
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`transition-colors duration-200 font-medium ${
                    scrolled 
                      ? 'text-gray-700 hover:text-[#0137A6]' 
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item}
                </a>
              ))}
              <button className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                scrolled
                  ? 'bg-[#0137A6] text-white hover:bg-blue-700'
                  : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white hover:text-[#0137A6] backdrop-blur-sm'
              }`}>
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`transition-colors duration-200 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-[#0137A6]' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden ${
          scrolled 
            ? 'bg-white/95' 
            : 'bg-white/10'
        } backdrop-blur-md`}>
          <div className="px-4 py-2 space-y-2 border-t border-white/20">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`block py-2 font-medium transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:text-[#0137A6]' 
                    : 'text-white hover:text-yellow-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className={`w-full px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              scrolled
                ? 'bg-[#0137A6] text-white hover:bg-blue-700'
                : 'bg-white/20 text-white border-2 border-white/50 hover:bg-white hover:text-[#0137A6] backdrop-blur-sm'
            }`}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0137A6] via-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Animated background shapes with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse"
            style={{ 
              animationDelay: '700ms',
              transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl animate-float"
            style={{ transform: `translate(calc(-50% + ${mousePosition.x * 0.2}px), calc(-50% + ${mousePosition.y * 0.2}px))` }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-fade-in bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 hover:bg-white/10 transition-all duration-500">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
                <div className="absolute inset-0 animate-spin-slow">
                  <Sparkles className="w-16 h-16 text-yellow-300 opacity-50" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Empowering Tomorrow with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-gradient min-h-[1.2em]">
                {typedText}<span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Transform your business with <span className="text-yellow-300 font-semibold">cutting-edge AI</span> technology, 
              <span className="text-yellow-300 font-semibold"> intelligent agents</span>, and 
              <span className="text-yellow-300 font-semibold"> process automation solutions</span>. <br className="hidden sm:block" />
              We build powerful <span className="text-yellow-300 font-semibold">AI agents</span>, automate workflows, and craft 
              interactive training tools tailored for tomorrow’s enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href="#what-we-do" className="bg-white text-[#0137A6] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 group">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0137A6] transition-all duration-200 transform hover:scale-105">
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <ChevronRight className="w-8 h-8 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-[#0137A6] mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Delivering excellence through innovative technology and expert knowledge
            </p>
          </div>

          {/* Stats counter */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 ${
            visibleSections.has('what-we-do') ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0137A6] mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={150} duration={2} />}+
              </div>
              <p className="text-gray-600">Clients Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0137A6] mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={50} duration={2} />}+
              </div>
              <p className="text-gray-600">AI Solutions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0137A6] mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={98} duration={2} />}%
              </div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#0137A6] mb-2">
                {visibleSections.has('what-we-do') && <CountUp end={24} duration={2} />}/7
              </div>
              <p className="text-gray-600">Support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:bg-[#0137A6] transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-200 hover:border-transparent relative overflow-hidden ${
                  visibleSections.has('what-we-do') 
                    ? 'animate-slide-up opacity-100' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 group-hover:from-[#0137A6]/90 group-hover:to-blue-700/90 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-[#0137A6] group-hover:text-white mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-200">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 bg-gradient-to-r from-indigo-500 to-[#0137A6] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-200">
              Interactive Learning Games
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Engage with our innovative educational games designed to make learning enjoyable and effective
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-white/20 ${
              visibleSections.has('games') 
                ? 'animate-scale-in opacity-100' 
                : 'opacity-0 scale-90'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="animate-bounce-slow">
                  <Gamepad2 className="w-12 h-12 text-[#0137A6]" />
                </div>
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                  Available Now
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                IFRS 17 Interactive Game
              </h3>
              <p className="text-gray-600 mb-6">
                Master complex IFRS 17 concepts through an engaging, gamified learning experience. Test your knowledge, earn points, and track your progress.
              </p>
              <a 
                href="https://ifrs-17-training-game.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0137A6] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 group shadow-lg hover:shadow-xl">
                Play Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section id="training" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-[#0137A6]">
              IFRS 17 Training Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional development courses designed by industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {trainingModules.map((module, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 transform hover:scale-105 ${
                  visibleSections.has('training') 
                    ? 'animate-slide-up opacity-100' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#0137A6] bg-opacity-10 rounded-lg group-hover:bg-opacity-20 transition-all backdrop-blur-sm group-hover:animate-wiggle">
                      <div className="text-[#0137A6]">{module.icon}</div>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100/80 backdrop-blur-sm px-3 py-1 rounded-full">IFRS 17</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {module.description}
                  </p>
                  <a
                    href={module.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0137A6] font-semibold hover:gap-4 transition-all duration-300 group/link"
                  >
                    Access Module
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="h-2 bg-gradient-to-r from-[#0137A6] to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 hover:text-[#0137A6] transition-colors duration-300 cursor-pointer">Kenbright AI</h3>
              <p className="text-gray-400 mb-6">
                Empowering businesses with intelligent solutions and innovative technology for a smarter tomorrow.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-[#0137A6] transition-all duration-300 border border-gray-700 hover:border-[#0137A6] transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0137A6]/50">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-[#0137A6] transition-all duration-300 border border-gray-700 hover:border-[#0137A6] transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0137A6]/50">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-[#0137A6] transition-all duration-300 border border-gray-700 hover:border-[#0137A6] transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0137A6]/50">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block">Sitemap</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-[#0137A6]" />
                  <span className="text-gray-400">info@kenbright.africa</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-[#0137A6]" />
                  <span className="text-gray-400">+254 709 783 000</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30 backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-[#0137A6]" />
                  <span className="text-gray-400">26th floor, Prism Towers, Nairobi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Kenbright AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KenbrightWebsite;