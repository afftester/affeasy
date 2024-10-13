"use client";

import { UserAdvertiserWithNameProps } from "@/lib/types";
import { useAddEditNetworkModal } from "@/ui/modals/add-edit-network-modal";
import { useDeleteNetworkModal } from "@/ui/modals/delete-network-modal";
import { Delete } from "@/ui/shared/icons";
import { Button, LoadingSpinner, Popover, TokenAvatar } from "@dub/ui";
import { APP_NAME, fetcher } from "@dub/utils";
import { Edit3, FolderOpen, MoreVertical } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const tabs: Array<"Networks"> = ["Networks"];

export default function NetworksPageClient() {
  const { setShowAddEditNetworkModal, AddEditNetworkModal } =
    useAddEditNetworkModal({});

  const [currentTab, setCurrentTab] = useState<"Networks">("Networks");

  const {
    data: userAdvertiserRelationships,
    mutate,
    isLoading,
  } = useSWR<UserAdvertiserWithNameProps[]>("/api/user/networks", fetcher);

  return (
    <>
      <AddEditNetworkModal />

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col items-center justify-between space-y-3 p-5 sm:flex-row sm:space-y-0 sm:p-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">Affiliate Networks</h2>
            <p className="text-sm text-gray-500">
              {`Affiliate Networks that you have added to ${APP_NAME}`}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              text="Add"
              onClick={() => setShowAddEditNetworkModal(true)}
              className="h-9"
            />
          </div>
        </div>
        <div className="flex space-x-3 border-b border-gray-200 px-3 sm:px-7">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`${
                tab === currentTab ? "border-black" : "border-transparent"
              } border-b py-1`}
            >
              <button
                onClick={() => setCurrentTab(tab)}
                className="rounded-md px-3 py-1.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
              >
                {tab}
              </button>
            </div>
          ))}
        </div>
        {isLoading || !userAdvertiserRelationships ? (
          <div className="flex flex-col items-center justify-center space-y-4 pb-20 pt-10">
            <LoadingSpinner className="h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-500">Fetching Networks...</p>
          </div>
        ) : userAdvertiserRelationships.length > 0 ? (
          <div>
            <div className="divide-y divide-gray-200">
              {userAdvertiserRelationships.map((userAdvertiserRelationship) => (
                <NetworkRow
                  key={userAdvertiserRelationship.id}
                  {...userAdvertiserRelationship}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 pb-20 pt-10">
            <FolderOpen className="h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-500">
              No Networks Found. Add one above.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

const NetworkRow = (relationship: UserAdvertiserWithNameProps) => {
  const [openPopover, setOpenPopover] = useState(false);

  const { DeleteNetworkModal, setShowDeleteNetworkModal } =
    useDeleteNetworkModal({
      relationship,
    });

  const props = relationship;
  const { setShowAddEditNetworkModal, AddEditNetworkModal } =
    useAddEditNetworkModal({ props });
  return (
    <>
      <DeleteNetworkModal />
      <AddEditNetworkModal />

      <div className="relative grid grid-cols-5 items-center px-5 py-3 sm:px-10">
        <div className="col-span-3 flex items-center space-x-3">
          <TokenAvatar id={relationship.advertiserId} />
          <div className="flex flex-col space-y-px">
            <p className="font-semibold text-gray-700">
              {relationship.name}
            </p>
          </div>
        </div>
        <div className="font-mono text-sm">{/* {token.partialKey} */}</div>
        <div
          className="text-center text-sm text-gray-500"
          suppressHydrationWarning
        >
          {/* {timeAgo(token.lastUsed)} */}
          {relationship.lastIntegrated && (
            <span className="text-xs text-gray-400">
              Last Integrated: {new Date(relationship.lastIntegrated).toLocaleDateString()}
            </span>
          )}
        </div>

        <Popover
          content={
            <div className="grid w-full gap-1 p-2 sm:w-48">
              <Button
                text="Edit"
                variant="outline"
                onClick={() => {
                  setOpenPopover(false);
                  setShowAddEditNetworkModal(true);
                }}
                icon={<Edit3 className="h-4 w-4" />}
                shortcut="E"
                className="h-9 px-2 font-medium"
              />
              <Button
                text="Delete"
                variant="danger-outline"
                onClick={() => {
                  setOpenPopover(false);
                  setShowDeleteNetworkModal(true);
                }}
                icon={<Delete className="h-4 w-4" />}
                shortcut="X"
                className="h-9 px-2 font-medium"
              />
            </div>
          }
          align="end"
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => {
              setOpenPopover(!openPopover);
            }}
            className="absolute right-4 rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
        </Popover>
      </div>
    </>
  );
};
