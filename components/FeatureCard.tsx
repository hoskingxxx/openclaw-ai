interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div className={`feature-card glass-card p-6 transition-all duration-300 hover:bg-white/12 hover:-translate-y-1 hover:shadow-lg ${className}`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
