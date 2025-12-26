import React from 'react';
import { Option } from '../types';

interface OptionCardProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
  multiSelect?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, isSelected, onClick, multiSelect }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 h-full w-full text-center hover:shadow-md ${
        isSelected
          ? 'border-actatek-secondary bg-green-50 text-actatek-dark shadow-md ring-1 ring-actatek-secondary'
          : 'border-gray-200 bg-white text-gray-600 hover:border-actatek-primary hover:text-actatek-primary'
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-4 h-4 bg-actatek-secondary rounded-full flex items-center justify-center">
             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
      )}
      
      <div className={`mb-4 p-3 rounded-full ${isSelected ? 'bg-white text-actatek-secondary' : 'bg-gray-100 text-gray-500'}`}>
        {option.icon}
      </div>
      
      <h3 className="font-bold text-lg mb-1">{option.label}</h3>
      {option.description && (
        <p className="text-sm text-gray-400 leading-snug">{option.description}</p>
      )}
      <span className="mt-4 inline-block px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-500 uppercase">
        Code: {option.code || '--'}
      </span>
    </button>
  );
};

export default OptionCard;