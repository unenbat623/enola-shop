import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  className?: string
}

export function Button({ children, isLoading, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={cn(
        "relative flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {children}
      </span>
    </button>
  )
}
