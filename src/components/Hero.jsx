import React from 'react'
import { MapPin, Coffee, Code2 } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-on-scroll">
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Coffee size={20} />
              <span className="text-sm font-medium">Welcome to my portfolio</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Padmanaban Varatharajan
              </span>
            </h1>

            <div className="flex items-center space-x-2 text-gray-600 mb-6">
              <Code2 size={20} />
              <span className="text-lg">Software Developer</span>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Passionate software developer with expertise in modern web technologies. 
              I love creating efficient, scalable solutions and turning ideas into reality. 
              Always eager to learn new technologies and tackle challenging problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://linkedin.com/in/padmanaban-varatharajan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Connect on LinkedIn
              </a>
              
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 hover:scale-105"
              >
                Get in Touch
              </button>
            </div>

            {/* Skills badges */}
            <div className="flex flex-wrap gap-3">
              {['React', 'JavaScript', 'Node.js', 'Python', 'TypeScript', 'TailwindCSS'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="animate-on-scroll">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Photo Placeholder</p>
                    <p className="text-gray-400 text-xs mt-1">Replace with your photo</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

