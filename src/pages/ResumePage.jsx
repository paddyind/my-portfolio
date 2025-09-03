import React, { useState } from 'react'
import { Download, ExternalLink, User, Briefcase, GraduationCap, Award, Code } from 'lucide-react'

const ResumePage = () => {
  const [isEmbedded, setIsEmbedded] = useState(false)

  // Sample resume data - replace with your actual information
  const resumeData = {
    summary: "Experienced Software Developer with 3+ years in full-stack development, specializing in modern web technologies and scalable applications.",
    
    experience: [
      {
        title: "Senior Software Developer",
        company: "Tech Solutions Inc.",
        period: "2022 - Present",
        description: [
          "Led development of React-based applications serving 10,000+ users",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: [
          "Developed REST APIs using Node.js and Express.js",
          "Built responsive web applications with React and TailwindCSS",
          "Collaborated with cross-functional teams in Agile environment"
        ]
      }
    ],

    education: [
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "University Name",
        year: "2020",
        grade: "First Class with Distinction"
      }
    ],

    skills: {
      "Frontend": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "TailwindCSS", "Angular"],
      "Backend": ["Node.js", "Python", "Express.js", "FastAPI", "REST APIs"],
      "Database": ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
      "Tools": ["Git", "Docker", "AWS", "Vercel", "Postman", "VS Code"]
    },

    certifications: [
      "AWS Certified Developer Associate",
      "Google Cloud Professional Cloud Architect",
      "Microsoft Azure Fundamentals"
    ]
  }

  return (
    <section id="resume" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
            <Briefcase size={24} />
            <span className="text-sm font-medium uppercase tracking-wide">Professional Background</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Resume & Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Detailed overview of my professional journey, skills, and accomplishments
          </p>
        </div>

        {/* Resume Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-on-scroll">
          <a
            href="/resume.pdf" // Replace with actual resume PDF path
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Download className="mr-2" size={20} />
            Download PDF Resume
          </a>
          
          <button
            onClick={() => setIsEmbedded(!isEmbedded)}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 hover:scale-105"
          >
            <ExternalLink className="mr-2" size={20} />
            {isEmbedded ? 'Hide' : 'View'} Embedded Resume
          </button>
        </div>

        {/* Embedded PDF Viewer */}
        {isEmbedded && (
          <div className="mb-12 animate-on-scroll">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                width="100%"
                height="600"
                className="rounded-lg shadow-lg"
                title="Resume PDF"
              >
                <p className="text-gray-600">
                  Your browser doesn't support PDF embedding. 
                  <a href="/resume.pdf" className="text-blue-600 hover:underline ml-1">
                    Click here to download the PDF
                  </a>
                </p>
              </iframe>
            </div>
          </div>
        )}

        {/* Resume Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Summary & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* Professional Summary */}
            <div className="animate-on-scroll">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 text-blue-600 mb-4">
                  <User size={20} />
                  <h3 className="text-lg font-semibold">Professional Summary</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="animate-on-scroll">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-2 text-blue-600 mb-4">
                  <Code size={20} />
                  <h3 className="text-lg font-semibold">Technical Skills</h3>
                </div>
                <div className="space-y-4">
                  {Object.entries(resumeData.skills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="animate-on-scroll">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-2 text-blue-600 mb-4">
                  <Award size={20} />
                  <h3 className="text-lg font-semibold">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            <div className="animate-on-scroll">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-2 text-blue-600 mb-6">
                  <Briefcase size={20} />
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                </div>
                <div className="space-y-6">
                  {resumeData.experience.map((job, index) => (
                    <div key={index} className="relative pl-8">
                      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                      {index < resumeData.experience.length - 1 && (
                        <div className="absolute left-2 top-4 w-0.5 h-full bg-gray-200"></div>
                      )}
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{job.title}</h4>
                        <div className="text-blue-600 font-medium mb-2">
                          {job.company} • {job.period}
                        </div>
                        <ul className="space-y-1 text-gray-700">
                          {job.description.map((desc, descIndex) => (
                            <li key={descIndex} className="flex items-start space-x-2">
                              <span className="text-blue-600 mt-2">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="animate-on-scroll">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-2 text-blue-600 mb-6">
                  <GraduationCap size={20} />
                  <h3 className="text-lg font-semibold">Education</h3>
                </div>
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        <p className="text-gray-600">{edu.grade}</p>
                      </div>
                      <div className="text-gray-500 font-medium mt-2 md:mt-0">
                        {edu.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumePage

