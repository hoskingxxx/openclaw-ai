interface AlertProps {
  variant?: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
  className?: string;
}

const alertStyles = {
  error: {
    bg: "bg-red-500/10",
    border: "border border-red-500/30",
    text: "text-red-200",
    title: "text-red-400",
  },
  warning: {
    bg: "bg-yellow-500/10",
    border: "border border-yellow-500/30",
    text: "text-yellow-200",
    title: "text-yellow-400",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border border-blue-500/30",
    text: "text-blue-200",
    title: "text-blue-400",
  },
  success: {
    bg: "bg-green-500/10",
    border: "border border-green-500/30",
    text: "text-green-200",
    title: "text-green-400",
  },
};

export function Alert({ variant = "info", children, className = "" }: AlertProps) {
  const styles = alertStyles[variant];
  const baseClassName = "p-4 rounded-lg";
  const combinedClassName = `${baseClassName} ${styles.bg} ${styles.border} ${className}`.trim();

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}

// Optional: Title component for Alert
interface AlertTitleProps {
  variant?: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
}

export function AlertTitle({ variant = "info", children }: AlertTitleProps) {
  const styles = alertStyles[variant];
  return (
    <h4 className={`text-sm font-mono ${styles.title} mb-3`}>
      {children}
    </h4>
  );
}
