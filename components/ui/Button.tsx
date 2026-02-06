import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "brand" | "info";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Allow data-* attributes
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  target,
  rel,
  onClick,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200";
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variantStyles = {
    primary: "bg-brand-primary hover:bg-brand-hover text-white shadow-md hover:shadow-lg hover:scale-105",
    secondary: "bg-background-tertiary hover:bg-background-elevated text-text-primary border border-white/10",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
    brand: "bg-brand-primary hover:bg-brand-hover text-white shadow-md hover:shadow-lg hover:scale-105",
    info: "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    if (external || target === "_blank") {
      return (
        <a
          href={href}
          target={target || "_blank"}
          rel={rel || "nofollow noopener noreferrer"}
          className={combinedClassName}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
