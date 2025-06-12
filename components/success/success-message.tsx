interface SuccessMessageProps {
  title?: string;
  description?: string;
}

export function SuccessMessage({
  title = "Ordre bekræftet! 🎉",
  description = "Tak for din ordre. Vi behandler den nu og sender en bekræftelse til din e-mail.",
}: SuccessMessageProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
