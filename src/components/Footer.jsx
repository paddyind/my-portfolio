import React from 'react'
import { Heart, Code, Coffee } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">Padmanaban Varatharajan</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Passionate software developer creating innovative solutions and bringing ideas to life through code.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" />
              <span>and</span>
              <Coffee size={16} className="text-yellow-600" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('resume').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Let's Connect</h4>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/in/padmanaban-varatharajan"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/padmanaban-varatharajan"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:padmanaban.varatharajan@example.com"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
              <Code size={16} />
              <span className="text-sm">
                © {currentYear} Padmanaban Varatharajan. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built with React & TailwindCSS</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
