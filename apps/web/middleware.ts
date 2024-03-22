import {
  ApiMiddleware,
  AppMiddleware,
  LinkMiddleware,
  RootMiddleware,
} from "@/lib/middleware";
import { parse } from "@/lib/middleware/utils";
import {
  ADMIN_HOSTNAMES,
  API_HOSTNAMES,
  APP_HOSTNAMES,
  DEFAULT_REDIRECTS,
} from "@dub/utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const roles = ["owner", "member"] as const;

export type RoleProps = (typeof roles)[number];

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  role: RoleProps;
  projects?: { projectId: string }[];
}

export async function tester(req: NextRequest) {
  const { path, fullPath } = parse(req);
  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    email?: string;
    user?: UserProps;
  };
  console.log("session", session);
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
console.log("VERCEL_URL", process.env.VERCEL_URL);

console.log("VERCEL_DEPLOYMENT", VERCEL_DEPLOYMENT);

console.log("NEXT_PUBLIC_APP_DOMAIN", process.env.NEXT_PUBLIC_APP_DOMAIN);

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key } = parse(req);
  console.log("middleware", { domain, path, key });

  // for App
  if (APP_HOSTNAMES.has(domain)) {
    console.log("app domain is getting compiled");
    return AppMiddleware(req);
  }

  // for API
  if (API_HOSTNAMES.has(domain)) {
    return ApiMiddleware(req);
  }

  // for root pages (e.g. dub.sh, chatg.pt, etc.)
  if (key.length === 0) {
    console.log("root domain is getting compiled");
    return RootMiddleware(req, ev);
  }

  return LinkMiddleware(req, ev);
}
