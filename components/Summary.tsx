import React from 'react';
import { Configuration, Option } from '../types';
import { CheckCircle, Share2, Download, RefreshCw } from 'lucide-react';

interface SummaryProps {
  config: Configuration;
  partNumber: string;
  onReset: () => void;
}

const SummaryItem: React.FC<{ label: string; value: string; sub?: string; icon?: React.ReactNode }> = ({ label, value, sub, icon }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
    <div className="mr-4 mt-1 text-actatek-primary opacity-80">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-bold text-gray-800 text-lg">{value}</p>
      {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
    </div>
  </div>
);

const Summary: React.FC<SummaryProps> = ({ config, partNumber, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-actatek-secondary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Configuration Complete!</h2>
        <p className="text-gray-500 mt-2">Here is your custom ACTAtek device specification.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
        <div className="bg-actatek-primary p-6 text-white text-center">
          <p className="text-sm uppercase tracking-wider opacity-90 mb-2">Your Part Number</p>
          <div className="text-3xl md:text-5xl font-mono font-bold bg-white/10 py-4 px-6 rounded-lg inline-block border border-white/20 select-all">
            {partNumber}
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SummaryItem 
            label="User Capacity" 
            value={config.users?.label || '-'} 
            sub={`Code: ${config.users?.code}`}
            icon={config.users?.icon}
          />
          <SummaryItem 
            label="Biometric" 
            value={config.biometric.map(b => b.label).join(' + ') || '-'} 
            sub={`Code: ${config.biometric.map(b => b.code || 'None').join('-')}`}
            icon={config.biometric.length > 0 ? config.biometric[0].icon : undefined}
          />
          <SummaryItem 
            label="Card Technology" 
            value={config.card?.label || '-'} 
            sub={`Code: ${config.card?.code}`}
            icon={config.card?.icon}
          />
          <SummaryItem 
            label="Network" 
            value={config.network.length > 0 ? config.network.map(n => n.label).join(' + ') : 'LAN'} 
            sub={`Code: ${config.network.length > 0 ? config.network.map(n => n.code).join('-') : 'Default'}`}
            icon={config.network.length > 0 ? config.network[0].icon : undefined}
          />
          <div className="md:col-span-2 flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
             <div className="mr-4 mt-1 text-actatek-primary opacity-80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
             </div>
             <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Optional Features</p>
                {config.features.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.features.map(f => (
                      <span key={f.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {f.label} ({f.code})
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">None selected</p>
                )}
             </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            <p className="text-sm text-gray-500 text-center md:text-left">
              Quote Ref: {new Date().toLocaleDateString()}-{Math.floor(Math.random() * 1000)}
            </p>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-actatek-primary text-white rounded-lg hover:bg-sky-700 transition-colors font-medium text-sm shadow-sm"
              >
                <Download className="w-4 h-4" /> Save PDF
              </button>
            </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onReset}
          className="inline-flex items-center gap-2 text-actatek-primary hover:text-actatek-secondary font-semibold transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Start Over
        </button>
      </div>
    </div>
  );
};

export default Summary;