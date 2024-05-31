import { Carrot } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Carrot className="h-8 w-8" />
      <p className="text-center font-black leading-tight">
        Budget
        <br />
        Calories
      </p>
    </div>
  );
}
