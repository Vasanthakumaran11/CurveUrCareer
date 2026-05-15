// Progress indicator component for multi-step assessment
import { Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Academic', icon: '📚' },
  { id: 2, name: 'Interests', icon: '🎯' },
  { id: 3, name: 'Goals', icon: '✨' },
  { id: 4, name: 'Evaluation', icon: '🧠' }
];

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 transform ${
                    currentStep > index
                      ? 'bg-emerald-500 text-white rotate-[360deg]'
                      : currentStep === index
                      ? 'bg-blue-600 text-white ring-8 ring-blue-100 scale-110 shadow-lg'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {currentStep > index ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <span
                  className={`mt-4 text-xs font-black uppercase tracking-widest transition-colors duration-500 ${
                    currentStep >= index ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1.5 mx-[-10px] relative top-[-20px] bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-1000 ease-in-out`}
                    style={{ width: currentStep > index ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
