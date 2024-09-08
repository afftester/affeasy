import { ReactNode } from "react";
import { Background } from "../marketing/marketing-components/background";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Background />
      <div className="relative z-10 flex h-screen w-screen justify-center">
        {children}
      </div>
    </>
  );
}
