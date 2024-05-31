import CaloRingDialog from "./calo-ring-dialog";

export default function CaloRing() {
  const caloriesEaten = 500;
  const caloriesTotal = 2000;
  const caloriesRatio = (caloriesEaten / caloriesTotal) * 100;

  return (
    <div
      className="mx-auto my-4 flex aspect-square w-1/2 max-w-96 items-center justify-center rounded-full bg-border"
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${caloriesRatio * 3.6}deg, hsl(var(--border)) 0deg)`,
      }}
    >
      <CaloRingDialog />
      <p
        className="relative font-bold"
        style={{
          fontSize: "clamp(1rem, 5vw, 2rem)",
        }}
      >
        {caloriesEaten}/{caloriesTotal}
      </p>
    </div>
  );
}
