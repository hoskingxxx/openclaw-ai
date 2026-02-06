interface CardProps {
  variant?: "default" | "error" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: "border-l-4 border-transparent",
  error: "border-l-4 border-red-500",
  warning: "border-l-4 border-yellow-500",
  info: "border-l-4 border-blue-500",
};

export function Card({ variant = "default", children, className = "" }: CardProps) {
  const baseStyles = "glass-card p-6 mb-8";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}
