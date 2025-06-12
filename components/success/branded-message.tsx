interface BrandedMessageProps {
  title?: string;
  subtitle?: string;
}

export function BrandedMessage({
  title = "🎬 Tak for at bruge Panoptikon!",
  subtitle = "Din vintage media oplevelse starter nu.",
}: BrandedMessageProps) {
  return (
    <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
      <p>{title}</p>
      <p>{subtitle}</p>
    </div>
  );
}
