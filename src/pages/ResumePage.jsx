import React, { useState } from 'react';
import { Download, ExternalLink, User, Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { aboutMe, experiences, skills } from './Professional';
import { education, certifications } from './Academic';

const ResumePage = () => {
  const [isEmbedded, setIsEmbedded] = useState(false);

  const resumeExperience = experiences.map((exp) => ({
    title: exp.role,
    company: exp.company,
    period: exp.duration,
    description: exp.responsibilities,
  }));

  const activeCertifications = certifications
    .filter((cert) => !cert.expired)
    .slice(0, 8)
    .map((cert) => cert.name);

  return (
    <div className="page-shell">
      <header className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">Resume & Experience</h1>
          <p className="page-hero-subtitle">
            Detailed overview of my professional journey, skills, and accomplishments
          </p>
        </div>
      </header>

      <main className="page-main">
        <div className="page-content">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-on-scroll">
            <a
              href="/resume.pdf"
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

          {isEmbedded && (
            <div className="mb-12 animate-on-scroll">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <iframe
                  src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  width="100%"
                  height="600"
                  className="rounded-lg shadow-lg"
                  title="Resume PDF"
                >
                  <p className="text-gray-600">
                    Your browser does not support PDF embedding.
                    <a href="/resume.pdf" className="text-blue-600 hover:underline ml-1">
                      Click here to download the PDF
                    </a>
                  </p>
                </iframe>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              <div className="animate-on-scroll">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 text-blue-600 mb-4">
                    <User size={20} />
                    <h3 className="text-lg font-semibold">Professional Summary</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{aboutMe.description}</p>
                </div>
              </div>

              <div className="animate-on-scroll">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-600 mb-4">
                    <Code size={20} />
                    <h3 className="text-lg font-semibold">Technical Skills</h3>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(skills).map(([category, skillList]) => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((skill) => (
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

              <div className="animate-on-scroll">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-600 mb-4">
                    <Award size={20} />
                    <h3 className="text-lg font-semibold">Certifications</h3>
                  </div>
                  <ul className="space-y-2">
                    {activeCertifications.map((cert) => (
                      <li key={cert} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="animate-on-scroll">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-600 mb-6">
                    <Briefcase size={20} />
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                  </div>
                  <div className="space-y-6">
                    {resumeExperience.map((job, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                        {index < resumeExperience.length - 1 && (
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

              <div className="animate-on-scroll">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-600 mb-6">
                    <GraduationCap size={20} />
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        {edu.details && <p className="text-gray-600">{edu.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumePage;
