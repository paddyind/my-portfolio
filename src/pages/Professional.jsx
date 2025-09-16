import React from 'react';
import { Briefcase, Zap, Award } from 'lucide-react';

const aboutMe = {
  title: 'About Me',
  description: `A seasoned Senior Software, Solutions Architect, and Director with over 19 years of experience in the telecommunications industry. Proven expertise in building and leading technical, functional, and development teams for end-to-end delivery of digital transformation and cloud migration projects. Holds multiple certifications in Kubernetes, AWS (Solutions Architect Associate, Machine Learning Specialty), and Microsoft Azure (Fundamentals, AI, Data Fundamentals, Associate level), and is a Google Cloud Digital Leader. Skilled in UI/UX, microservices, TMF ODA, Open API, SOA, and backend services for large-scale web and mobile applications. Possesses strong customer-facing, solution design, and architecture experience in multi-channel digital solutions for telecom BSS. Certified in PGP-AIML with hands-on experience in machine/deep learning models. Holds a Master's in Medical Electronics from College of Engineering, Guindy, and a Bachelor's in Electronics and Communication from Kumaraguru College of Technology.`,
};

const experiences = [
  {
    company: 'Amdocs',
    role: 'Senior Software Architect',
    duration: 'Nov 2017 - Present',
    responsibilities: [
      'Led team building and mentoring to kickstart projects and expedite delivery.',
      'Designed B2B sales solutions and contributed to the digital product roadmap.',
      'Collaborated with the product team to achieve deployment from design in under three months.',
      'Implemented a reusable and extensible design thinking approach, saving millions in man-months (MM).',
      'Conducted technical grooming, proof of concept, and design for development.',
      'Developed a proof of concept for using AWS Bedrock to create Generative AI solutions for personalized customer offers and promotions.',
    ],
  },
  {
    company: 'Amdocs',
    role: 'Development Expert/Architect',
    duration: 'Dec 2013 - Nov 2017',
    responsibilities: [
      "Led design and development for AT&T's Enterprise Premier/Business Center eBill and BI OneStop Portal.",
      'Provided solutions and estimations for new projects and change requests on various platforms like Microservices, SOA/Restful Services, and SOAP WS.',
      'Acted as a single point of contact for development and production support activities at the client site.',
      'Mentored and guided the development team, including offshore members.',
      'Coordinated with Release Management, QA, and UAT teams to ensure smooth project delivery.',
    ],
  },
  {
    company: 'Amdocs',
    role: 'Development Expert',
    duration: 'Apr 2012 - Dec 2013',
    responsibilities: [
      'Contributed to the design and development of telecom BSS solutions.',
      'Worked on low-level design and technical solutions for various projects.',
      'Involved in the development of RESTful services and other backend components.',
    ],
  },
  {
    company: 'Amdocs',
    role: 'Development Group Leader',
    duration: 'Apr 2010 - Mar 2012',
    responsibilities: [
      'Led a development group in the design and implementation of software solutions.',
      'Managed project timelines and deliverables.',
      'Provided technical guidance and mentorship to team members.',
    ],
  },
  {
    company: 'Amdocs',
    role: 'Senior Subject Matter Expert',
    duration: 'Jul 2007 - Mar 2010',
    responsibilities: [
      'Served as a subject matter expert in telecom BSS and related technologies.',
      'Created low-level design documents and class diagrams.',
      'Contributed to the development and implementation of key software components.',
    ],
  },
  {
    company: 'Amdocs',
    role: 'Subject Matter Expert',
    duration: 'Jun 2006 - Jun 2007',
    responsibilities: [
      'Provided expertise in telecom BSS and product catalog management.',
      'Contributed to software development and integration efforts.',
      'Achieved Java Certified Programmer certification.',
    ],
  },
  {
    company: 'Syntel',
    role: 'Programmer Analyst',
    duration: 'Jan 2005 - Jun 2006',
    responsibilities: [
      'Developed and supported IBM Lotus Notes-based workflow applications.',
      'Wrote unit test cases and performed unit testing.',
      'Handled defects and resolved issues based on assigned tasks.',
      'Participated in a migration project involving IBM DB2 and re-engineering of a Lotus Notes application to Java/J2EE.',
    ],
  },
];

const skills = {
  'Cloud & DevOps': ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'DevOps'],
  'Backend & Architecture': ['Microservices', 'SOA', 'REST', 'SOAP', 'Spring Boot', 'Java/J2EE', 'Python', 'Node.js', 'PostgreSQL', 'Apache Kafka'],
  'Frontend & UI/UX': ['AngularJS', 'React', 'HTML', 'CSS', 'JavaScript', 'UI/UX Design'],
  'Telecom & BSS': ['Telecom BSS', 'TMF ODA', 'Open API', 'Order Management', 'Product Catalog', 'Billing Systems'],
  'AI & Machine Learning': ['Generative AI', 'AWS Bedrock', 'Machine Learning', 'Deep Learning', 'NLP', 'PGP-AIML'],
  'Methodologies & Tools': ['Agile', 'Scrum', 'Design Thinking', 'Jira', 'Git', 'Linux'],
};

const ProfessionalPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Professional Journey
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            A Glimpse into My Career and Expertise
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Me Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
              <Briefcase className="w-10 h-10 mr-4 text-indigo-600" />
              About Me
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 leading-relaxed">
                {aboutMe.description}
              </p>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center">
              <Zap className="w-10 h-10 mr-4 text-indigo-600" />
              Experience
            </h2>
            <div className="relative">
              <div className="absolute left-5 top-5 h-full border-l-2 border-indigo-200"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-12 pl-12 relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                  <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">{exp.duration}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{exp.role}</h3>
                  <p className="text-lg text-gray-600 font-medium">{exp.company}</p>
                  <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
              <Award className="w-10 h-10 mr-4 text-indigo-600" />
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalPage;
