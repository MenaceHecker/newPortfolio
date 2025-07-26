import React, { useState } from 'react';
import { 
  Home, 
  User, 
  BookOpen, 
  Briefcase, 
  Mail, 
  Monitor 
} from 'lucide-react';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const [activeNav, setActiveNav] = useState<string>('#');

  const navItems = [
    { href: '#', icon: Home, label: 'Home' },
    { href: '#AnimatedCounter', icon: User, label: 'About' },
    { href: '#experience', icon: Monitor, label: 'Experience' },
    { href: '#cv', icon: BookOpen, label: 'CV' },
    { href: '#projects', icon: Briefcase, label: 'Projects' },
    { href: '#contact', icon: Mail, label: 'Contact' }
  ];

  const handleNavClick = (href: string) => {
    setActiveNav(href);
  };

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 
                   bg-black bg-opacity-10 backdrop-blur-sm
                   flex gap-3 px-7 py-3 rounded-full
                   max-w-max">
      {navItems.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          onClick={() => handleNavClick(href)}
          className={`
            p-4 rounded-full flex items-center justify-center
            text-gray-300 text-lg transition-all duration-200
            hover:bg-black hover:bg-opacity-30
            ${activeNav === href 
              ? 'bg-blue-500 text-white' 
              : 'bg-transparent'
            }
          `}
          aria-label={label}
        >
          <Icon size={20} />
        </a>
      ))}
    </nav>
  );
};

export default Nav;