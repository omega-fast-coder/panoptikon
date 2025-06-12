import { Mail, Package, Truck } from "lucide-react";

interface OrderInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface OrderInfoProps {
  items?: OrderInfoItem[];
}

const defaultItems: OrderInfoItem[] = [
  {
    icon: Mail,
    text: "Bekræftelse sendt til din e-mail",
  },
  {
    icon: Package,
    text: "Din ordre pakkes inden for 24 timer",
  },
  {
    icon: Truck,
    text: "Forventet levering: 2-3 hverdage",
  },
];

export function OrderInfo({ items = defaultItems }: OrderInfoProps) {
  return (
    <div className="space-y-3 text-sm">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Icon className="h-4 w-4" />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
