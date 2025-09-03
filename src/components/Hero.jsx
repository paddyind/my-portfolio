import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-32 overflow-hidden">
      {/* Background shapes for a subtle decorative effect */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Padmanaban Varatharajan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600">
              Multi Cloud Architect | AIML/GenAI Enthusiast | Lifelong Learner
            </p>
            <p className="mt-6 max-w-xl text-gray-500">
              I build and scale web applications with a focus on performance, user experience, and robust architecture. Passionate about solving complex problems with elegant solutions.
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <a href="https://linkedin.com/in/padmanaban-varatharajan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin size={28} />
              </a>
              <a href="https://github.com/paddyind" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                <Github size={28} />
              </a>
              {/* <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-colors">
                <Twitter size={28} />
              </a> */}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/3"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-xl opacity-70"></div>
              <img
                // Replace with your photo URL or import it from the /public folder
                src="https://via.placeholder.com/320"
                alt="Padmanaban Varatharajan"
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;