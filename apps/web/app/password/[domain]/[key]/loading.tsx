import { LoadingSpinner } from "@dub/ui";
import { Background } from "../../../marketing/marketing-components/background";

export default function Loading() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
      <Background />
    </main>
  );
}
