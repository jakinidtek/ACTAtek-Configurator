import React from 'react';
import { Check } from 'lucide-react';
import { STEPS } from '../constants';
import { StepId } from '../types';

interface StepIndicatorProps {
  currentStep: StepId;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-6 px-4 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex items-center justify-between w-full">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
          
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center group relative">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                    isCompleted 
                      ? 'bg-actatek-secondary border-actatek-secondary text-white' 
                      : isCurrent 
                        ? 'bg-actatek-primary border-actatek-primary text-white shadow-lg scale-110' 
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <div className={`mt-2 text-xs md:text-sm font-medium absolute top-full w-32 text-center transition-colors duration-300 ${
                  isCurrent ? 'text-actatek-primary' : isCompleted ? 'text-actatek-secondary' : 'text-gray-400'
                }`}>
                  <span className="hidden md:block">{step.title}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 md:hidden text-center">
            <h2 className="text-lg font-semibold text-gray-800">
                {currentStep < 5 ? STEPS[currentStep].title : 'Summary'}
            </h2>
            <p className="text-sm text-gray-500">
                {currentStep < 5 ? STEPS[currentStep].subtitle : 'Review your configuration'}
            </p>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;