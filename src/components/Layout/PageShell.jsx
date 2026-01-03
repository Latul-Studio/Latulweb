import React from 'react';

const PageShell = ({ title, children }) => {
    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-8">Contenido en construcción...</p>
            {children}
        </div>
    );
};

export default PageShell;
