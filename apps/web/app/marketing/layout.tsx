import Background from "./marketing-components/background";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Background>{children}</Background>
    </>
  );
}
