import { ReactNode } from "react";
import { Background } from "../marketing/marketing-components/background";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background />
      {children}
    </>
  );
}
