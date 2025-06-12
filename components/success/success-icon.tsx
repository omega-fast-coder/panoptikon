import { CheckCircle } from "lucide-react";

export function SuccessIcon() {
  return (
    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-10 w-10 text-green-600" />
    </div>
  );
}
