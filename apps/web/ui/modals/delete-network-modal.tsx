import { Button, Logo, Modal, TokenAvatar, useMediaQuery } from "@dub/ui";
import { Advertiser } from "@prisma/client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { mutate } from "swr";

function DeleteNetworkModal({
  showDeleteNetworkModal,
  setShowDeleteNetworkModal,
  network,
}: {
  showDeleteNetworkModal: boolean;
  setShowDeleteNetworkModal: Dispatch<SetStateAction<boolean>>;
  network: Advertiser;
}) {
  const [removing, setRemoving] = useState(false);

  const { isMobile } = useMediaQuery();

  return (
    <Modal
      showModal={showDeleteNetworkModal}
      setShowModal={setShowDeleteNetworkModal}
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <Logo />
        <h3 className="text-lg font-medium">Delete Network</h3>
        <p className="text-center text-sm text-gray-500">
          This will permanently delete all information about this network. You
          will not be able to create any affiliate links for brands that you
          partner through this network.
        </p>
        <p className="text-center text-sm text-gray-500">
          Are you sure you want to continue?
        </p>
      </div>

      <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 text-left sm:px-16">
        <div className="relative flex items-center space-x-3 rounded-md border border-gray-300 bg-white px-1 py-3">
          {/* <Badge variant="neutral" className="absolute right-2 top-2">
            {token.partialKey}
          </Badge> */}
          <TokenAvatar id={network.id} />
          <div className="flex flex-col">
            <h3 className="line-clamp-1 w-48 font-semibold text-gray-700">
              {network.name}
            </h3>
            {/* <p className="text-xs text-gray-500" suppressHydrationWarning>
              Last used {timeAgo(token.lastUsed, { withAgo: true })}
            </p> */}
          </div>
        </div>
        <Button
          text="Confirm"
          variant="danger"
          autoFocus={!isMobile}
          loading={removing}
          onClick={() => {
            setRemoving(true);
            fetch(`/api/user/networks?id=${network.id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }).then(async (res) => {
              setRemoving(false);
              if (res.status === 200) {
                toast.success(`Successfully deleted Network`);
                mutate("/api/user/networks");
                setShowDeleteNetworkModal(false);
              } else {
                const error = await res.text();
                toast.error(error);
              }
            });
          }}
        />
      </div>
    </Modal>
  );
}

export function useDeleteNetworkModal({ network }: { network: Advertiser }) {
  const [showDeleteNetworkModal, setShowDeleteNetworkModal] = useState(false);

  const DeleteNetworkModalCallback = useCallback(() => {
    return (
      <DeleteNetworkModal
        showDeleteNetworkModal={showDeleteNetworkModal}
        setShowDeleteNetworkModal={setShowDeleteNetworkModal}
        network={network}
      />
    );
  }, [showDeleteNetworkModal, setShowDeleteNetworkModal]);

  return useMemo(
    () => ({
      setShowDeleteNetworkModal,
      DeleteNetworkModal: DeleteNetworkModalCallback,
    }),
    [setShowDeleteNetworkModal, DeleteNetworkModalCallback],
  );
}
