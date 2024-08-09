export function Background() {
  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full bg-[#F5F5F6]">
      <div
        className="absolute inset-0 bg-white"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          maskImage: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 10%, rgba(255, 255, 255, 0.7) 30%, white 50%, rgba(255, 255, 255, 0.7) 70%, rgba(255, 255, 255, 0.15) 90%, transparent)`,
        }}
      />
    </div>
  );
}
