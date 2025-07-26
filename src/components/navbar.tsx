import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  BookOpen, 
  Briefcase, 
  Mail, 
  Monitor 
} from 'lucide-react';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const [activeNav, setActiveNav] = useState<string>('#home');
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Navigation items with icons
  const navItems: NavItem[] = [
    { href: '#home', icon: Home, label: 'Home' },
    { href: '#about', icon: User, label: 'About' },
    { href: '#experience', icon: Monitor, label: 'Experience' },
    { href: '#cv', icon: BookOpen, label: 'CV' },
    { href: '#projects', icon: Briefcase, label: 'Projects' }
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveNav(href);
    
    // Smooth scroll to section
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`
      fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 
      transition-all duration-300 ease-in-out
      ${scrolled 
        ? 'bg-black bg-opacity-5 backdrop-blur-sm' 
        : 'bg-black bg-opacity-2 backdrop-blur-xs'
      }
      flex items-center gap-1 px-6 py-3 rounded-full
      max-w-max border border-white border-opacity-5
    `}>
      <div className="flex items-center gap-1">
        {/* Navigation Icons */}
        {navItems.map(({ href, icon: Icon, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`
              group relative p-3 rounded-full flex items-center justify-center
              text-lg transition-all duration-200
              ${activeNav === href 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-300 hover:bg-black hover:bg-opacity-30 hover:text-white'
              }
            `}
            aria-label={label}
          >
            <Icon size={20} />
            
            {/* Tooltip */}
            <span className={`
              absolute -top-10 left-1/2 transform -translate-x-1/2
              bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              whitespace-nowrap pointer-events-none
            `}>
              {label}
            </span>
          </a>
        ))}

        {/* Contact Button with Icon */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className={`
            group relative ml-2 px-4 py-2 rounded-full border transition-all duration-200
            flex items-center gap-2
            ${activeNav === '#contact'
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
            }
          `}
        >
          <Mail size={16} />
          <span className="text-sm font-medium">Contact</span>
        </a>
      </div>
    </nav>
  );
};

export default Nav;