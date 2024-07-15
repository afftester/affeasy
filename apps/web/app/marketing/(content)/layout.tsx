import * as React from "react";

import { MarketingLayout } from "../marketing-components/marketing-layout";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
