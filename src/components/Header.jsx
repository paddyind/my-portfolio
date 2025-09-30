import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/professional', label: 'Professional' },
  { to: '/resume', label: 'Resume' },
  { to: '/academic', label: 'Academic' },
  { to: '/hobbies', label: 'Hobbies' },
  {
    label: 'Personal',
    to: '/personal',
    submenu: [
      { to: '/personal/learnings', label: 'My Learnings' },
      { to: '/personal/interviews', label: 'My Interviews' },
      { to: '/personal/preparation', label: 'My Preparation' },
    ],
  },
  { to: '/family', label: 'Family' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPersonalMenuOpen, setIsPersonalMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-700 hover:text-blue-600'
    }`

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              PV
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsPersonalMenuOpen(true)}
                    onMouseLeave={() => setIsPersonalMenuOpen(false)}
                  >
                    <button className={`${navLinkClasses({ isActive: false })} flex items-center`}>
                      {item.label}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    {isPersonalMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <NavLink
                              key={subItem.to}
                              to={subItem.to}
                              className={mobileNavLinkClasses}
                              onClick={() => setIsPersonalMenuOpen(false)}
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navLinkClasses}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setIsPersonalMenuOpen(!isPersonalMenuOpen)}
                      className={`${mobileNavLinkClasses({ isActive: false })} w-full flex justify-between items-center`}
                    >
                      {item.label}
                      <ChevronDown size={20} className={`transform transition-transform ${isPersonalMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isPersonalMenuOpen && (
                      <div className="pl-4">
                        {item.submenu.map((subItem) => (
                          <NavLink
                            key={subItem.to}
                            to={subItem.to}
                            onClick={closeMenu}
                            className={mobileNavLinkClasses}
                          >
                            {subItem.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={mobileNavLinkClasses}
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
