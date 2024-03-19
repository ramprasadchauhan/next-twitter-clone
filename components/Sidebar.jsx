"use client";
import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useSession, SessionProvider, signIn, signOut } from "next-auth/react";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    return router.push("/") && signOut();
  };
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-20">
      {/* Logo */}
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="twitter"
          width="50"
          height="50"
          priority
        />
      </div>
      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuItem text="Notification" Icon={BellIcon} />
            <SidebarMenuItem text="Message" Icon={InboxIcon} />
            <SidebarMenuItem text="BookMark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>
      {/* Button */}
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>
          {/* Mini Profile */}
          <div className="hoverEffect text-gray-700 flex  items-center justify-center mt-auto gap-2 xl:justify-start">
            <Image
              onClick={handleSignOut}
              src={session.user.image}
              alt="image"
              width="50"
              height="50"
              priority
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline truncate max-w-[160px]">
              <h4 className="font-bold truncate">{session?.user?.name} </h4>
              <p className="text-gray-500 truncate">
                @{session.user.username}{" "}
              </p>
            </div>
            <EllipsisHorizontalIcon className="h-5 xl:ml-4 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

const SidebarWithSession = () => (
  <SessionProvider>
    <Sidebar />
  </SessionProvider>
);

export default SidebarWithSession;
