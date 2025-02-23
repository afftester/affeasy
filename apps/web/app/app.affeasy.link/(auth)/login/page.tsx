import { Button, Logo } from "@dub/ui";
import { HOME_DOMAIN, constructMetadata } from "@dub/utils";
import { Suspense } from "react";
import LoginForm from "./form";

export const metadata = constructMetadata({
  title: `Sign in to ${process.env.NEXT_PUBLIC_APP_NAME}`,
});

export default function LoginPage() {
  return (
    <>
      {/* Shutdown Banner */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="w-full bg-gradient-to-r from-red-600 to-red-500 p-6 shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-xl font-bold text-white">
              ⚠️ Important Update ⚠️
            </h2>
            <p className="text-red-100">
              AffEasy has now been permanently shut down. We truly appreciate
              your support and are grateful to have been part of your journey.
            </p>
            <p className="mt-2 font-medium text-white">
              Thank you for being with us! 🙏
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-[calc(25vh)] h-fit w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href={HOME_DOMAIN}>
            <Logo className="h-11 w-11" />
          </a>
          <h3 className="text-xl font-semibold">
            Sign in to {process.env.NEXT_PUBLIC_APP_NAME}
          </h3>
          <p className="text-sm text-gray-500">
            Start creating short links with superpowers
          </p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
          <Suspense
            fallback={
              <>
                <Button disabled={true} variant="secondary" />
                <Button disabled={true} variant="secondary" />
                <Button disabled={true} variant="secondary" />
                <div className="mx-auto h-5 w-3/4 rounded-lg bg-gray-100" />
              </>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
