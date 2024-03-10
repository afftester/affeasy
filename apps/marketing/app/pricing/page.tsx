import { InputForm } from "@/components/waitlist-form";
import { HeaderT } from "@/components/headert";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <HeaderT />
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Simple, transparent pricing
            </h2>
          </div>
        </section>
      </div>
      <div className="-z-50 rounded-md bg-[#fbf7ef] m-3 md:m-4 md:rounded-[15px]">
        <section
          id="pricing"
          className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto grid justify-center gap-4 lg:grid-cols-3">
            <div className="overflow-hidden rounded-[15px] border bg-background p-2 drop-shadow-md">
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl">Free</h3>
                  <p className="text-sm text-muted-foreground">For Hobbyists</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-5xl">$0</h3>
                  <p className="text-sm text-muted-foreground">Free Forever</p>
                </div>
              </div>
              <Separator />
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <p className="text-sm text-muted-foreground font-bold">
                  What&apos;s included:
                </p>
                <ul className="flex flex-col gap-3 text-md text-black">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 25 links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 1K tracked links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 30 day analytics
                    retention
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> Help center support
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-hidden rounded-[15px] border bg-background p-2 drop-shadow-md">
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl">Pro</h3>
                  <p className="text-sm text-muted-foreground">
                    For small businesses
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-5xl">
                    $24.99
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Billed monthly
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <p className="text-sm text-muted-foreground font-bold">
                  Everything in Free, plus:
                </p>
                <ul className="flex flex-col gap-3 text-md text-black">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 1000 links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 50K tracked links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 1-year analytics
                    retention
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> Basic email support.
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-hidden rounded-[15px] border bg-background p-2 drop-shadow-md">
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl">Business</h3>
                  <p className="text-sm text-muted-foreground">
                    For larger teams
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-5xl">
                    $49.99
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Billed monthly
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex h-[180px] flex-col gap-4 rounded-md p-6 mb-6">
                <p className="text-sm text-muted-foreground font-bold">
                  Everything in Pro, plus:
                </p>
                <ul className="flex flex-col gap-3 text-md text-black">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 5000 links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 250K tracked links/mo
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> 2-year analytics
                    retention
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" /> Email and Chat
                    support
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <section id="pricing"></section>
        </section>
      </div>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <section id="open-source" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center pt-5">
            <h3 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Join the waitlist now!
            </h3>
            <InputForm />
          </div>
        </section>
      </div>
    </>
  );
}
