interface OrderNumberDisplayProps {
  orderNumber: string;
}

export function OrderNumberDisplay({ orderNumber }: OrderNumberDisplayProps) {
  return (
    <div className="bg-accent/50 p-4 rounded-lg">
      <div className="text-sm text-muted-foreground mb-1">Ordrenummer</div>
      <div className="text-xl font-bold text-foreground">{orderNumber}</div>
    </div>
  );
}
