
import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  smallText?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, smallText = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-brand-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className={`font-medium ${smallText ? 'text-sm' : 'text-base'}`}>{title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-brand-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="bg-brand-gray-100/50">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
