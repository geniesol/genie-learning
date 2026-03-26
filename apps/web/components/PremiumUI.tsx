import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  variant?: 'light' | 'dark' | 'none';
  hoverEffect?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'light',
  hoverEffect = true,
  ...props 
}: GlassCardProps) {
  return (
    <div 
      className={cn(
        variant === 'light' ? 'glass' : variant === 'dark' ? 'glass-dark' : '',
        hoverEffect && 'hover:scale-[1.02] hover:shadow-2xl hover:border-white/20 transition-all duration-500',
        'p-6 rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface PremiumButtonProps extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function PremiumButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-primary/20 hover:border-primary/50 text-primary bg-transparent',
    ghost: 'hover:bg-primary/5 text-muted-foreground hover:text-primary',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs font-bold',
    md: 'px-6 py-2.5 text-sm font-bold',
    lg: 'px-8 py-3.5 text-base font-extrabold',
  };

  return (
    <button
      className={cn(
        'rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BadgePill({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn(
      "px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest",
      className
    )}>
      {children}
    </span>
  );
}
