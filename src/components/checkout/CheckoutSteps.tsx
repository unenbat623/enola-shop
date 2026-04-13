import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  currentStep: 1 | 2 | 3
}

export default function CheckoutSteps({ currentStep }: Props) {
  const steps = [
    { id: 1, label: 'Мэдээлэл' },
    { id: 2, label: 'Төлбөр' },
    { id: 3, label: 'Баталгаа' },
  ]

  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto mb-16">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1 last:flex-none">
          {/* Step Circle */}
          <div className="flex flex-col items-center relative">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-medium text-[13px] transition-all duration-300 border-1.5",
                currentStep > step.id
                  ? "border-brand-ghost text-brand-ghost bg-transparent"
                  : currentStep === step.id
                  ? "bg-brand-ink border-brand-ink text-brand-base"
                  : "bg-transparent border-brand-border text-brand-hint"
              )}
            >
              {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span className={cn(
              "absolute -bottom-8 whitespace-nowrap text-[10px] font-medium normal-case tracking-[1.5px]",
              currentStep === step.id ? "text-brand-ink" : "text-brand-hint"
            )}>
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 px-4">
              <div
                className={cn(
                  "h-px w-full transition-all duration-500",
                  currentStep > step.id ? "bg-brand-ghost" : "bg-brand-border"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
