import React, { useState } from 'react';

const scenarios = [
  {
    title: 'Launch of a New Telecom Product',
    situation: 'The company planned to launch a new 5G-enabled IoT service for enterprise clients, but we faced unexpected technical hurdles with network slicing just weeks before the deadline.',
    task: 'My role as the lead architect was to identify the root cause of the integration issues, devise a mitigation plan, and ensure the product could still launch on time without compromising quality.',
    action: 'I assembled a cross-functional team of network engineers, software developers, and QA testers. We conducted a series of targeted stress tests and code reviews, which isolated the problem to a misconfiguration in the network function virtualization (NFV) layer. I then designed a patch and a phased rollout strategy, starting with a pilot group of customers.',
    result: 'The patch was successful, and we were able to proceed with the launch as scheduled. The new service was well-received, and the phased rollout allowed us to gather valuable feedback and make further improvements, leading to a 20% increase in customer adoption in the first quarter.',
  },
  {
    title: 'Resolving a Major Service Outage',
    situation: 'A critical fiber optic cable was damaged, causing a major service outage for thousands of customers in a metropolitan area.',
    task: 'As the technical lead on call, I was responsible for coordinating the response, restoring service as quickly as possible, and managing communication with stakeholders.',
    action: 'I immediately activated our emergency response protocol, dispatching a repair crew to the location of the break. Simultaneously, I worked with the network operations team to reroute traffic through redundant pathways. I provided regular updates to the leadership team and the customer support department.',
    result: 'We were able to restore service to 90% of affected customers within two hours, and full service was restored within four hours. The incident led to a review of our network redundancy, and we have since implemented additional measures to prevent similar outages in the future.',
  },
];

const ScenarioGenerator = () => {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);

  const generateNewScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Leadership Scenario Generator (STAR Format)</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{currentScenario.title}</h3>
        <p className="mt-2"><strong>Situation:</strong> {currentScenario.situation}</p>
        <p className="mt-2"><strong>Task:</strong> {currentScenario.task}</p>
        <p className="mt-2"><strong>Action:</strong> {currentScenario.action}</p>
        <p className="mt-2"><strong>Result:</strong> {currentScenario.result}</p>
      </div>
      <button
        onClick={generateNewScenario}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Generate New Scenario
      </button>
    </div>
  );
};

export default ScenarioGenerator;