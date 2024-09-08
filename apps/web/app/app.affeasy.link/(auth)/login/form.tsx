"use client";

import { Button, Github, Google, useMediaQuery } from "@dub/ui";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [showSSOOption, setShowSSOOption] = useState(false);
  const [noSuchAccount, setNoSuchAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [clickedGoogle, setClickedGoogle] = useState(false);
  const [clickedGitub, setClickedGithub] = useState(false);
  const [clickedEmail, setClickedEmail] = useState(false);
  const [clickedSSO, setClickedSSO] = useState(false);

  useEffect(() => {
    const error = searchParams?.get("error");
    error && toast.error(error);
  }, [searchParams]);

  const { isMobile } = useMediaQuery();

  useEffect(() => {
    // when leave page, reset state
    return () => {
      setClickedGoogle(false);
      setClickedGithub(false);
      setClickedEmail(false);
      setClickedSSO(false);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-3">
        <Button
          variant="secondary"
          onClick={() => {
            setClickedGoogle(true);
            signIn("google", {
              ...(next && next.length > 0 ? { callbackUrl: next } : {}),
            });
          }}
          loading={clickedGoogle}
          disabled={clickedEmail || clickedSSO}
          icon={<Google className="h-5 w-5" />}
        />
        <Button
          variant="secondary"
          onClick={() => {
            setClickedGithub(true);
            signIn("github", {
              ...(next && next.length > 0 ? { callbackUrl: next } : {}),
            });
          }}
          loading={clickedGitub}
          disabled={clickedEmail || clickedSSO}
          icon={<Github className="h-5 w-5 text-black" />}
        />
      </div>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-gray-500 transition-colors hover:text-black"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
