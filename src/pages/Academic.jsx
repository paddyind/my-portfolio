import React from 'react';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';

const education = [
  {
    institution: 'College of Engineering, Guindy',
    degree: 'Master of Engineering - MEng, Biomedical/Medical Engineering',
  },
  {
    institution: 'Great Lakes Institute of Management',
    degree: 'Post Graduate Program, Artificial Intelligence and Machine Learning',
    details: 'Grade: 97%',
    ePortfolio: 'https://eportfolio.greatlearning.in/padmanaban-varatharajan',
  },
  {
    institution: 'Kumaraguru College of Technology',
    degree: 'Bachelor of Engineering - BE, Electrical, Electronics and Communications Engineering',
  },
];

const certifications = [
  { name: 'CKA: Certified Kubernetes Administrator', issuer: 'The Linux Foundation', date: 'Issued Jul 2023 · Expires Jul 2026' },
  { name: 'CKAD: Certified Kubernetes Application Developer', issuer: 'The Linux Foundation', date: 'Issued Jul 2023 · Expires Jul 2026' },
  { name: 'AWS Developer Tools', issuer: 'QA North America', date: 'Issued Aug 2024' },
  { name: 'Building, Deploying, and Running Containers in Production', issuer: 'QA North America', date: 'Issued Aug 2024' },
  { name: 'Provision Infrastructure As Code with AWS CloudFormation', issuer: 'QA North America', date: 'Issued Aug 2024' },
  { name: 'Building Generative AI applications with Amazon Bedrock', issuer: 'QA North America', date: 'Issued Jun 2024' },
  { name: 'Generative AI Fundamentals of AWS', issuer: 'QA North America', date: 'Issued Jun 2024' },
  { name: 'Google Cloud Digital Leader Exam Preparation', issuer: 'QA North America', date: 'Issued Sep 2023' },
  { name: 'Microsoft Certified: Azure AI Fundamentals', issuer: 'Microsoft', date: 'Issued Aug 2021' },
  { name: 'Microsoft Certified: Azure Data Fundamentals', issuer: 'Microsoft', date: 'Issued Jul 2021' },
  { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', date: 'Issued Jul 2020' },
  { name: 'Getting Started with AWS Machine Learning', issuer: 'Coursera', date: 'Issued Jun 2021' },
  { name: 'Blockchain Basics', issuer: 'LinkedIn', date: 'Issued Sep 2021' },
  { name: 'Blockchain: Beyond the Basics', issuer: 'LinkedIn', date: 'Issued Sep 2021' },
  { name: 'Enterprise Architecture Foundations', issuer: 'LinkedIn', date: 'Issued Sep 2021' },
  { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services (AWS)', date: 'Issued May 2021 · Expired May 2024', expired: true },
  { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services (AWS)', date: 'Issued Jul 2020 · Expired Jul 2023', expired: true },
  { name: 'Microsoft Certified: Azure AI Engineer Associate', issuer: 'Microsoft', date: 'Issued May 2021 · Expired May 2023', expired: true },
  { name: 'Microsoft Certified: Azure Data Scientist Associate', issuer: 'Microsoft', date: 'Issued Aug 2021 · Expired Aug 2022', expired: true },
];

const AcademicPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Academic & Certifications
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            My Educational Background and Professional Credentials
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Education Section - 30% (3 columns) */}
            <section className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-indigo-600" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                    <p className="text-sm text-indigo-600 font-medium mt-1">{edu.degree}</p>
                    {edu.details && <p className="text-sm text-gray-600 mt-2">{edu.details}</p>}
                    {edu.ePortfolio && (
                      <a
                        href={edu.ePortfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                      >
                        View ePortfolio <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Licenses & Certifications Section - 70% (7 columns) */}
            <section className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3 text-indigo-600" />
                Licenses & Certifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className={`bg-white p-5 rounded-lg shadow-md ${cert.expired ? 'opacity-60' : ''}`}>
                    <h3 className="text-lg font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600 font-medium mt-2">{cert.issuer}</p>
                    <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                    {cert.expired && (
                      <span className="inline-block bg-red-100 text-red-800 text-xs font-medium mt-2 px-2 py-0.5 rounded-full">
                        Expired
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademicPage;
