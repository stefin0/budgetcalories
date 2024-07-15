import { fetchCaloriesGoal } from "@/lib/data";
import CaloRingDialog from "./calo-ring-dialog";
import { auth } from "@/auth";

export default async function CaloRing() {
  const session = await auth();
  let caloriesGoal = 2000

  if (session && session.user?.id) {
     caloriesGoal = await fetchCaloriesGoal(session.user.id) || caloriesGoal
  }

  const caloriesEaten = 500;
  const caloriesRatio = (caloriesEaten / caloriesGoal) * 100;

  return (
    <div
      className="mx-auto my-4 flex aspect-square w-1/2 max-w-96 items-center justify-center rounded-full bg-border"
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${caloriesRatio * 3.6}deg, hsl(var(--border)) 0deg)`,
      }}
    >
      <CaloRingDialog caloriesGoal={caloriesGoal} />
      <p
        className="relative font-bold"
        style={{
          fontSize: "clamp(1rem, 5vw, 2rem)",
        }}
      >
        {caloriesEaten}/{caloriesGoal}
      </p>
    </div>
  );
}
