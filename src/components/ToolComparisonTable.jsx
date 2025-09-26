import React from 'react';

const ToolComparisonTable = () => {
  // Placeholder data for tool comparison
  const tools = [
    { id: 1, name: 'React', pros: 'Component-based, large community', cons: 'Can be complex, requires build step', useCase: 'Single-page applications' },
    { id: 2, name: 'Vue', pros: 'Easy to learn, good documentation', cons: 'Smaller community than React', useCase: 'Progressive web apps' },
    { id: 3, name: 'Angular', pros: 'Full-featured framework, backed by Google', cons: 'Steep learning curve', useCase: 'Large enterprise applications' },
    { id: 4, name: 'Svelte', pros: 'No virtual DOM, fast performance', cons: 'Smaller ecosystem', useCase: 'Performance-critical applications' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Tool Comparison</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Tool</th>
            <th className="py-2">Pros</th>
            <th className="py-2">Cons</th>
            <th className="py-2">Use Case</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td className="py-2">{tool.name}</td>
              <td className="py-2">{tool.pros}</td>
              <td className="py-2">{tool.cons}</td>
              <td className="py-2">{tool.useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolComparisonTable;