import { ReactNode } from "react";
import { Background } from "../../marketing/marketing-components/background";

export const runtime = "edge";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      <div className="relative z-10 flex h-screen w-screen justify-center">
        {children}
      </div>
    </>
  );
}
