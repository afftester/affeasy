import { siteConfig } from "@/config/site";
import { SignalHighIcon, Link2Icon, QrCodeIcon } from "lucide-react";
import { HeaderT } from "@/components/headert";
import { InputForm } from "@/components/waitlist-form";
import { BentoGridDemo } from "@/components/bento-grid";

export default async function IndexPage() {
  return (
    <>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <HeaderT />
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="relative container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-green-400 px-4 py-1.5 text-sm font-medium text-white">
              Beta
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              One Stop Affiliate Link Creation{" "}
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-600 sm:text-xl sm:leading-8">
              Effortlessly create, organize, and track all your affiliate links
              across different networks with AffEasy
            </p>
            <h3 className="font-heading ">
              Join the Waitlist now to Simplify Your Affiliate Marketing
            </h3>
            <InputForm />
          </div>
        </section>
      </div>
      <div className="rounded-md bg-[#fbf7ef] m-3 md:m-4 md:rounded-[15px]">
        <section id="open-source" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Supercharge your Affiliate Efforts
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              AffEasy is a one-stop solution that transforms affiliate link
              management. Our platform is designed to centralize the creation,
              organization, saving you time and enhancing your marketing
              efforts.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] mt-5">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[170px] sm:h-[220px] lg:h-[180px]  flex-col gap-4 rounded-md p-6">
                <SignalHighIcon />
                <div className="space-y-2">
                  <h3 className="font-bold">Unified Network Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Access a multitude of affiliate networks from a single
                    dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[200px] sm:h-[220px] lg:h-[180px] flex-col gap-4 rounded-md p-6">
                <Link2Icon />
                <div className="space-y-2">
                  <h3 className="font-bold">Rapid Link Creation</h3>
                  <p className="text-sm text-muted-foreground">
                    Say goodbye to the hassle of manually creating affiliate
                    links. Produce affiliate links from one location in a matter
                    of seconds!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="rounded-md bg-gradient-to-br from-[#FBD7FF] via-[#FEDCD6] to-[#FFDEC2] m-3 md:m-4 md:rounded-[15px]">
        <section
          id="how-it-works"
          className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl mb:5 md:mb-10">
              All Major Affiliate Networks Supported
            </h2>
          </div>
          <BentoGridDemo />
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <p className="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
              And many more!
            </p>
          </div>
        </section>
      </div>
      <div className="rounded-md bg-[#fbf7ef] m-3 md:m-4 md:rounded-[15px]">
        <section
          id="features"
          className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              In addition to one stop affiliate link creation, we provide a
              bunch of additional features to make the life of affiliate
              marketers easier
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] sm:h-[220px] lg:h-[210px] flex-col gap-4 rounded-md p-6">
                <SignalHighIcon />
                <div className="space-y-2">
                  <h3 className="font-bold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    AffEasy provides powerful analytics for your links. See how
                    well your links are performing easily.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] sm:h-[220px] lg:h-[210px] flex-col gap-4 rounded-md p-6">
                <Link2Icon />
                <div className="space-y-2">
                  <h3 className="font-bold">Link Shortening</h3>
                  <p className="text-sm text-muted-foreground">
                    Free built-in link shortening
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] sm:h-[220px] lg:h-[210px] flex-col gap-4  rounded-md p-6">
                <QrCodeIcon />
                <div className="space-y-2">
                  <h3 className="font-bold">QR Code Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Free built-in QR Code generation to make link sharing even
                    easier!
                  </p>
                </div>
              </div>
            </div>
          </div>
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
