"use client";

import { Avatar, Badge, IconMenu, Popover } from "@dub/ui";
import { HOME_DOMAIN } from "@dub/utils";
import va from "@vercel/analytics";
// import { Crisp } from "crisp-sdk-web";
import Cookies from "js-cookie";
import { Edit3, HelpCircle, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserDropdown() {
  const { data: session } = useSession();
  const [openPopover, setOpenPopover] = useState(false);

  const [unreadChangelogs, setUnreadChangelogs] = useState(0);
  useEffect(() => {
    const lastReadChangelog = Cookies.get("lastReadChangelog");
    if (!lastReadChangelog) {
      setUnreadChangelogs(2);
    }
  }, []);

  return (
    <div className="relative inline-block">
      <Popover
        content={
          <div className="flex w-full flex-col space-y-px rounded-md bg-white p-3 sm:w-56">
            <Link
              href="/"
              className="p-2"
              onClick={() => setOpenPopover(false)}
            >
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">
                {session?.user?.email}
              </p>
            </Link>
            <Link
              href={`https://docs.affeasy.link/introduction`}
              onClick={() => setOpenPopover(false)}
              target="_blank"
              className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Help Center"
                icon={<HelpCircle className="h-4 w-4" />}
              />
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpenPopover(false)}
              className="block w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Settings"
                icon={<Settings className="h-4 w-4" />}
              />
            </Link>
            <Link
              href={`${HOME_DOMAIN}/changelog`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                Cookies.set("lastReadChangelog", new Date().toISOString());
                setOpenPopover(false);
              }}
              className="flex w-full justify-between rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu text="Changelog" icon={<Edit3 className="h-4 w-4" />} />
              {unreadChangelogs > 0 && (
                <Badge variant="blue">{unreadChangelogs}</Badge>
              )}
            </Link>
            <button
              className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => {
                signOut({
                  callbackUrl: "/login",
                });
                // track logout event
                va.track("Logout");
              }}
            >
              <IconMenu text="Logout" icon={<LogOut className="h-4 w-4" />} />
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="group relative"
        >
          {session?.user ? (
            <Avatar
              user={session.user}
              className="h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
            />
          ) : (
            <div className="h-9 w-9 animate-pulse rounded-full border border-gray-300 bg-gray-100 sm:h-10 sm:w-10" />
          )}
          {unreadChangelogs > 0 && (
            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500" />
          )}
        </button>
      </Popover>
    </div>
  );
}
