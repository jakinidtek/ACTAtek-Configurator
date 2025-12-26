import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw, Layers, CreditCard, Info } from 'lucide-react';
import StepIndicator from './components/StepIndicator';
import OptionCard from './components/OptionCard';
import Summary from './components/Summary';
import { 
  Configuration, 
  StepId, 
  Option 
} from './types';
import { 
  USER_OPTIONS, 
  BIOMETRIC_OPTIONS, 
  CARD_OPTIONS, 
  NETWORK_OPTIONS, 
  FEATURE_OPTIONS,
  STEPS
} from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>(StepId.USERS);
  const [config, setConfig] = useState<Configuration>({
    users: null,
    biometric: [],
    card: null,
    network: [],
    features: [],
  });

  const partNumber = useMemo(() => {
    const parts = ['AT'];
    if (config.users) parts.push(config.users.code);
    
    // Sort biometrics to ensure consistent order (e.g. FA then FLI)
    // We can use the index in BIOMETRIC_OPTIONS to determine order
    const sortedBiometrics = [...config.biometric].sort((a, b) => {
      const indexA = BIOMETRIC_OPTIONS.findIndex(opt => opt.id === a.id);
      const indexB = BIOMETRIC_OPTIONS.findIndex(opt => opt.id === b.id);
      return indexA - indexB;
    });

    sortedBiometrics.forEach(bio => {
      if (bio.code) parts.push(bio.code);
    });

    if (config.card) parts.push(config.card.code);
    
    // Sort network options to ensure consistent order (e.g. P then W then W3)
    const sortedNetwork = [...config.network].sort((a, b) => {
      const indexA = NETWORK_OPTIONS.findIndex(opt => opt.id === a.id);
      const indexB = NETWORK_OPTIONS.findIndex(opt => opt.id === b.id);
      return indexA - indexB;
    });

    sortedNetwork.forEach(net => {
      if (net.code) parts.push(net.code);
    });
    
    // Sort features as well if needed, but current usage is appending order
    config.features.forEach(feat => parts.push(feat.code));
    
    return parts.join('-');
  }, [config]);

  const handleNext = () => {
    if (currentStep < StepId.SUMMARY) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > StepId.USERS) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setConfig({
      users: null,
      biometric: [],
      card: null,
      network: [],
      features: [],
    });
    setCurrentStep(StepId.USERS);
  };

  const updateConfig = (key: keyof Configuration, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleBiometric = (option: Option) => {
    setConfig(prev => {
      const current = prev.biometric;
      const isSelected = current.some(b => b.id === option.id);

      // Handle 'No Biometrics' exclusive logic
      if (option.id === 'none') {
        return { ...prev, biometric: [option] };
      }

      let newBiometrics: Option[];
      if (isSelected) {
        newBiometrics = current.filter(b => b.id !== option.id);
      } else {
        newBiometrics = [...current, option];
      }

      // Remove 'none' if it exists in the list (since we just selected/deselected a real one)
      newBiometrics = newBiometrics.filter(b => b.id !== 'none');
      
      return { ...prev, biometric: newBiometrics };
    });
  };

  const toggleNetwork = (option: Option) => {
    setConfig(prev => {
      // Handle 'LAN' (id: 'lan') as reset/default
      if (option.id === 'lan') {
        return { ...prev, network: [] };
      }

      const current = prev.network;
      const isSelected = current.some(n => n.id === option.id);
      
      if (isSelected) {
        return { ...prev, network: current.filter(n => n.id !== option.id) };
      } else {
        return { ...prev, network: [...current, option] };
      }
    });
  };

  const toggleFeature = (feature: Option) => {
    setConfig(prev => {
      const exists = prev.features.find(f => f.id === feature.id);
      if (exists) {
        return { ...prev, features: prev.features.filter(f => f.id !== feature.id) };
      }
      return { ...prev, features: [...prev.features, feature] };
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case StepId.USERS: return !!config.users;
      case StepId.BIOMETRIC: return config.biometric.length > 0;
      case StepId.CARD: return !!config.card;
      case StepId.NETWORK: return true; // Default is LAN (empty array), always valid
      case StepId.FEATURES: return true; // Optional
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case StepId.USERS:
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-3xl mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2 rounded-lg text-actatek-primary shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the ACTAtek Configurator</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This app aims to help customers choose the correct ACTAtek model for their purchase to meet their 
                    requirements or tender specifications. Start by choosing your required user capacity below, 
                    then proceed through authentication methods, card technologies, and network options. 
                    The system will automatically generate the correct Part Number for your specific configuration.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {USER_OPTIONS.map(opt => (
                <OptionCard 
                  key={opt.id} 
                  option={opt} 
                  isSelected={config.users?.id === opt.id}
                  onClick={() => updateConfig('users', opt)}
                />
              ))}
            </div>
          </div>
        );
      case StepId.BIOMETRIC:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {BIOMETRIC_OPTIONS.map(opt => (
              <OptionCard 
                key={opt.id} 
                option={opt} 
                isSelected={config.biometric.some(b => b.id === opt.id)}
                onClick={() => toggleBiometric(opt)}
                multiSelect // Adding visual cue support if we want to extend OptionCard later
              />
            ))}
          </div>
        );
      case StepId.CARD:
        const multiCards = CARD_OPTIONS.filter(opt => opt.category === 'multi');
        const singleCards = CARD_OPTIONS.filter(opt => opt.category === 'single');

        return (
          <div className="space-y-10">
            {/* Single Card Section */}
            <div>
               <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-lg mr-3 text-actatek-secondary">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Single Technology</h3>
                  <p className="text-sm text-gray-500">Specific card readers for dedicated requirements</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {singleCards.map(opt => (
                  <OptionCard 
                    key={opt.id} 
                    option={opt} 
                    isSelected={config.card?.id === opt.id}
                    onClick={() => updateConfig('card', opt)}
                  />
                ))}
              </div>
            </div>

            {/* Multi-Card Section */}
            <div>
              <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-lg mr-3 text-actatek-primary">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Multi-Card Support</h3>
                  <p className="text-sm text-gray-500">Universal and combo readers for maximum compatibility</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {multiCards.map(opt => (
                  <OptionCard 
                    key={opt.id} 
                    option={opt} 
                    isSelected={config.card?.id === opt.id}
                    onClick={() => updateConfig('card', opt)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case StepId.NETWORK:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {NETWORK_OPTIONS.map(opt => {
              // LAN is selected if network array is empty
              const isSelected = opt.id === 'lan' 
                ? config.network.length === 0 
                : config.network.some(n => n.id === opt.id);
              
              return (
                <OptionCard 
                  key={opt.id} 
                  option={opt} 
                  isSelected={isSelected}
                  onClick={() => toggleNetwork(opt)}
                  multiSelect={opt.id !== 'lan'}
                />
              );
            })}
          </div>
        );
      case StepId.FEATURES:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURE_OPTIONS.map(opt => (
              <OptionCard 
                key={opt.id} 
                option={opt} 
                isSelected={!!config.features.find(f => f.id === opt.id)}
                onClick={() => toggleFeature(opt)}
                multiSelect
              />
            ))}
          </div>
        );
      case StepId.SUMMARY:
        return <Summary config={config} partNumber={partNumber} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm z-50 sticky top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-actatek-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              A
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              <span className="text-actatek-primary">ACTA</span>tek <span className="text-gray-400 font-light">Configurator</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              Draft: {partNumber}
            </div>
          </div>
        </div>
      </header>

      {/* Steps Navigation */}
      <StepIndicator currentStep={currentStep} />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep < StepId.SUMMARY && (
                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {STEPS[currentStep].title}
                    </h2>
                    <p className="text-gray-500 text-lg">
                        {STEPS[currentStep].subtitle}
                    </p>
                </div>
            )}
            
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Navigation */}
      {currentStep !== StepId.SUMMARY && (
        <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <div className="hidden sm:flex flex-col items-center">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Current Part Number</span>
                <span className="font-mono font-bold text-actatek-primary text-lg">{partNumber}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-8 py-3 rounded-lg text-sm font-medium shadow-md transition-all ${
                !canProceed()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-actatek-primary text-white hover:bg-sky-700 hover:shadow-lg active:transform active:scale-95'
              }`}
            >
              Next Step
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;