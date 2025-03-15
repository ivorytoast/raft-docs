import React from 'react';

function DocSection({ 
  id, 
  number, 
  title, 
  children 
}) {
  return (
    <section id={id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default DocSection; 