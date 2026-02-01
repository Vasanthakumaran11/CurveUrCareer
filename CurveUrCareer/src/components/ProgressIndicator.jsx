// Progress indicator component for multi-step assessment
import { Check } from 'lucide-react';

const steps = [
  { id: 1, name: 'Academic', icon: '📚' },
  { id: 2, name: 'Interests', icon: '🎯' },
  { id: 3, name: 'Skills', icon: '💪' },
  { id: 4, name: 'Expectations', icon: '🎓' },
  { id: 5, name: 'Constraints', icon: '⚖️' }
];

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                    currentStep > index
                      ? 'bg-green-500 text-white'
                      : currentStep === index
                      ? 'bg-primary-500 text-white ring-4 ring-primary-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > index ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= index ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 relative top-[-20px]">
                  <div
                    className={`h-full transition-all duration-300 ${
                      currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                    }`}
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
