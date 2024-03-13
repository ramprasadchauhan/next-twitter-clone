import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
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

const Sidebar = () => {
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
        <SidebarMenuItem text="Notification" Icon={BellIcon} />
        <SidebarMenuItem text="Message" Icon={InboxIcon} />
        <SidebarMenuItem text="BookMark" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      {/* Button */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>
      {/* Mini Profile */}
      <div className="hoverEffect text-gray-700 flex  items-center justify-center mt-auto gap-2 xl:justify-start">
        <Image
          src="https://media.licdn.com/dms/image/D5603AQEbI4K4FjhQ9A/profile-displayphoto-shrink_800_800/0/1707203530522?e=1715212800&v=beta&t=piD66hgwL01Q8fyOC2TUMJZGG-1kLTv86dkMLg2PQIY"
          alt="image"
          width="50"
          height="50"
          priority
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Ramprasad Chauhan </h4>
          <p className="text-gray-500">@ramprasadchauhan</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 xl:ml-4 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
