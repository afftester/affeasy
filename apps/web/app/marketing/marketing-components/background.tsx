export function Background() {
  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="absolute inset-0 bg-[radial-gradient(#e3e1e1_0.9px,transparent_0.9px)] bg-[length:10px_10px] [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.2)_10%,rgba(255,255,255,0.8)_30%,white_50%,rgba(255,255,255,0.8)_70%,rgba(255,255,255,0.2)_90%,transparent)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-orange-100/20 mix-blend-multiply"></div>
    </div>
  );
}
