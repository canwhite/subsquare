import React from "react";
import Avatar from "next-common/components/avatar";
import Tooltip from "next-common/components/tooltip";
import SignalIndicator from "next-common/components/icons/signalIndicator";
import AddressUser from "next-common/components/user/addressUser";
import { useCollectivesContext } from "next-common/context/collectives/collectives";

export default function AvatarAndAddress({ address, isActive }) {
  const { section } = useCollectivesContext();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative w-10 h-10">
        <Avatar address={address} size={40} />
        <Tooltip
          className={"absolute right-0 bottom-0"}
          content={isActive ? "Active" : "Inactive"}
        >
          <SignalIndicator className="w-4 h-4" active={isActive} />
        </Tooltip>
      </div>

      <AddressUser
        add={address}
        showAvatar={false}
        className="text14Medium text-textPrimary [&_.identity]:!font-semibold"
        link={`/${section}`}
      />
    </div>
  );
}

export function AvatarAndAddressInListView({ address, isActive }) {
  const { section } = useCollectivesContext();

  return (
    <div className="flex items-center gap-x-[8px]">
      <Tooltip content={isActive ? "Active" : "Inactive"}>
        <SignalIndicator className="w-[16px] h-[16px]" active={isActive} />
      </Tooltip>
      <AddressUser
        add={address}
        className="text14Medium text-textPrimary"
        link={`/${section}`}
      />
    </div>
  );
}
