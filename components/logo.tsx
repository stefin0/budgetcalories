import { Donut } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Donut className="w-8 h-8" />
      <p className="font-black text-center leading-tight">
        Budget
        <br />
        Calories
      </p>
    </div>
  );
}
