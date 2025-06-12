import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

const EmptyState = ({ title, description, icon: Icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {Icon && <Icon className="w-10 h-10" />}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyState;
