"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { UserAdvertiserWithNameProps } from "@/lib/types";
import LinkLogo from "@/ui/links/link-logo";
import { X } from "@/ui/shared/icons";
import { HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";

import {
  Button,
  Modal,
  TooltipContent,
  useMediaQuery,
  useRouterStuff,
} from "@dub/ui";
import {
  DEFAULT_LINK_PROPS as DEFAULT_USER_ADVERTISER_PROPS,
  cn,
  fetcher,
  isValidUrl,
} from "@dub/utils";
import { Advertiser } from "@prisma/client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

function AddEditNetworkModal({
  showAddEditNetworkModal,
  setShowAddEditNetworkModal,
  props,
}: {
  showAddEditNetworkModal: boolean;
  setShowAddEditNetworkModal: Dispatch<SetStateAction<boolean>>;
  props?: UserAdvertiserWithNameProps;
}) {
  const params = useParams() as { slug?: string };
  const router = useRouter();
  const pathname = usePathname();

  const [keyError, setKeyError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: networks, isLoading } = useSWR<Advertiser[]>(
    "/api/networks",
    fetcher,
  );

  const { data: existingNetworks } = useSWR<UserAdvertiserWithNameProps[]>(
    "/api/user/networks",
    fetcher,
  );

  const [data, setData] = useState<UserAdvertiserWithNameProps>(
    props || DEFAULT_USER_ADVERTISER_PROPS,
  );

  const [changedFields, setChangedFields] = useState<Record<string, any>>({});

  useEffect(() => {
    if (props) {
      setData(props);
      setChangedFields({});
    } else {
      setData(DEFAULT_USER_ADVERTISER_PROPS);
      setChangedFields({});
    }
  }, [props]);

  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));

    // For API key and client secret, we store the full value in changedFields
    // but only display the partial value in the input
    if (field === "partialApiKey") {
      setChangedFields((prevFields) => ({ ...prevFields, apiKey: value }));
    } else if (field === "partialClientSecret") {
      setChangedFields((prevFields) => ({
        ...prevFields,
        clientSecret: value,
      }));
    } else {
      setChangedFields((prevFields) => ({ ...prevFields, [field]: value }));
    }
  };

  useEffect(() => {
    // for a new link (no props), set the networkName to the name of the first network
    if (networks && !props && networks.length > 0) {
      setData((prev) => ({ ...prev, advertiserId: networks[0].id }));
    }
  }, [networks, props]);

  const {
    id,
    advertiserId,
    partialApiKey,
    username,
    partialPassword,
    accountId,
    clientId,
    partialClientSecret,
    websiteId,
  } = data;

  const networkName =
    networks &&
    advertiserId &&
    networks.find((network) => network.id === advertiserId)?.name;

  const endpoint = useMemo(() => {
    if (props?.id) {
      return {
        method: "PUT",
        url: `/api/user/networks`,
      };
    } else {
      return {
        method: "POST",
        url: `/api/user/networks`,
      };
    }
  }, [props]);

  const [atBottom, setAtBottom] = useState(false);
  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) < 5) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  }, []);

  const saveDisabled = useMemo(() => {
    /* 
      Disable save if:
      - modal is not open
      - saving is in progress
      - key is invalid

      - for an existing link, there's no changes
    */
    if (
      !showAddEditNetworkModal ||
      saving ||
      keyError ||
      (props &&
        Object.entries(props).every(([key, value]) => {
          // If the key is "title" or "description" and proxy is not enabled, return true (skip the check)
          if (
            key === "id" ||
            key === "userId" ||
            key === "advertiserId" ||
            key == "advertiser"
          ) {
            return true;
          }
          // Otherwise, check for discrepancy in the current key-value pair
          return data[key] === value;
        }))
    ) {
      return true;
    } else {
      return false;
    }
  }, [showAddEditNetworkModal, saving, keyError, props, data]);

  const randomIdx = Math.floor(Math.random() * 100);
  const welcomeFlow = pathname === "/welcome";
  const searchParams = useSearchParams();
  const slug = welcomeFlow ? searchParams?.get("slug") : params.slug;

  const { isMobile } = useMediaQuery();

  const { queryParams } = useRouterStuff();

  return (
    <Modal
      showModal={showAddEditNetworkModal}
      setShowModal={setShowAddEditNetworkModal}
      preventDefaultClose={true}
      onClose={() => {
        if (welcomeFlow) {
          router.push(`/${slug}`);
          setShowAddEditNetworkModal(false);
        } else if (searchParams.has("newLink")) {
          queryParams({
            del: ["newLink"],
          });
        }
      }}
    >
      <div className="scrollbar-hide grid max-h-[95vh] w-full divide-x divide-gray-100 overflow-auto md:overflow-hidden">
        <button
          onClick={() => {
            setShowAddEditNetworkModal(false);
            if (welcomeFlow) {
              router.push(`/${slug}`);
            }
          }}
          className="group absolute right-0 top-0 z-20 m-3 hidden rounded-full p-2 text-gray-500 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200 md:block"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          className="scrollbar-hide rounded-l-2xl md:max-h-[95vh] md:overflow-auto"
          onScroll={handleScroll}
        >
          <div className="z-10 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 pb-8 pt-8 transition-all md:sticky md:top-0 md:px-16">
            <LinkLogo />
            <h3 className="max-w-sm truncate text-lg font-medium">
              {props ? `Edit Network` : "Add a new Affiliate Network"}
            </h3>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);

              const networkExists = existingNetworks?.some(
                (network) =>
                  network.advertiserId === data.advertiserId &&
                  network.id !== props?.id,
              );

              if (networkExists) {
                toast.error(
                  "You have already connected this network to AffEasy. We don't currently support multiple connections of the same affiliate network.",
                );
                setSaving(false);
                return;
              }

              const bodyData = props
                ? { id: props.id, ...changedFields }
                : {
                    advertiserId: data.advertiserId,
                    username: data.username,
                    password: data.partialPassword,
                    apiKey: changedFields.apiKey || data.partialApiKey,
                    accountId: data.accountId,
                    websiteId: data.websiteId,
                    clientId: data.clientId,
                    clientSecret:
                      changedFields.clientSecret || data.partialClientSecret,
                  };

              fetch(endpoint.url, {
                method: endpoint.method,
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
              }).then(async (res) => {
                if (res.status === 200) {
                  mutate("/api/user/networks");
                  const data = await res.json();

                  // Use the stringified relationship in the second fetch request
                  fetch(`/api/user/brands`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  });

                  if (props) {
                    toast.success("Network Record Modified!");
                  } else {
                    toast.success("Network Added!");
                  }

                  // for welcome page, redirect to links page after adding a link
                  if (welcomeFlow) {
                    router.push(`/${slug}`);
                    setShowAddEditNetworkModal(false);
                  }

                  setShowAddEditNetworkModal(false);
                } else {
                  const { error } = await res.json();
                  if (error) {
                    toast.error(error.message);
                    if (error.message.toLowerCase().includes("key")) {
                      setKeyError(error.message);
                    }
                  }
                }
                setSaving(false);
              });
            }}
            className="grid gap-6 bg-gray-50 pt-8"
          >
            <div className="grid gap-6 px-4 md:px-16">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`key-${randomIdx}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Affiliate Network
                  </label>
                </div>
                <select
                  disabled={!!props}
                  value={advertiserId}
                  onChange={(e) =>
                    handleInputChange("advertiserId", e.target.value)
                  }
                  className={cn(
                    "w-full rounded-md border border-gray-300 bg-gray-50 pl-4 pr-8 text-sm text-gray-500 focus:border-gray-300 focus:outline-none focus:ring-0",
                    props && "cursor-not-allowed",
                  )}
                >
                  {networks?.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name || ""}
                    </option>
                  ))}
                </select>
              </div>

              {advertiserId === "1" ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction#3-obtain-your-cj-property-id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="websiteID"
                        id={`websiteID-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction"
                        }
                        value={websiteId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("websiteId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        API Key
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction#4-create-a-new-peronal-access-token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="apiKey"
                        id={`apiKey-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction"
                        }
                        value={partialApiKey ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("partialApiKey", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction#2-obtain-your-cj-cid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="accountId"
                        id={`accountId-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction"
                        }
                        value={accountId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("accountId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                </>
              ) : advertiserId === "2" ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Client ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/rakuten#5-connect-rakuten-to-affeasy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="clientId"
                        id={`clientId-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/rakuten"
                        }
                        value={clientId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("clientId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Client Secret
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/rakuten#5-connect-rakuten-to-affeasy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="clientSecret"
                        id={`clientSecret-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/rakuten#5-connect-rakuten-to-affeasy"
                        }
                        value={partialClientSecret ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange(
                            "partialClientSecret",
                            e.target.value,
                          )
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/rakuten#2-obtain-your-site-id-sid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="accountId"
                        id={`accountId-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/rakuten"
                        }
                        value={accountId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("accountId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                </>
              ) : advertiserId === "3" ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/amazon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="websiteID"
                        id={`websiteID-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/amazon"
                        }
                        value={websiteId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("websiteId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                </>
              ) : advertiserId === "4" ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                      />
                    </div>
                  </div>
                </>
              ) : advertiserId === "5" ? ( // Impact.com
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`impactAccountId-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Impact Account ID
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/impact#setup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="impactAccountId"
                        id={`impactAccountId-${randomIdx}`}
                        placeholder="Enter your Impact Account ID"
                        value={impactAccountId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("impactAccountId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`impactApiKey-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Impact API Key
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/impact#api-key"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="impactApiKey"
                        id={`impactApiKey-${randomIdx}`}
                        type="password"
                        placeholder="Enter your Impact API Key"
                        value={partialApiKey ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("partialApiKey", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                </>
              ) : advertiserId === "4" ? (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website URL
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/planethowl  "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="websiteID"
                        id={`websiteID-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/commision-junction"
                        }
                        value={websiteId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("websiteId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        API Key
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/planethowl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="apiKey"
                        id={`apiKey-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/planethowl"
                        }
                        value={partialApiKey ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("partialApiKey", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`url-${randomIdx}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website Name
                      </label>
                      <a
                        href="https://docs.affeasy.link/quickstart/affiliate-networks/planethowl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </a>
                    </div>
                    <div className="relative mt-1 flex rounded-md shadow-sm">
                      <input
                        name="accountId"
                        id={`accountId-${randomIdx}`}
                        placeholder={
                          "https://docs.affeasy.link/quickstart/affiliate-networks/planethowl"
                        }
                        value={accountId ?? ""}
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange("accountId", e.target.value)
                        }
                        className={`${"border-gray-300 text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:ring-gray-500"} block w-full rounded-md focus:outline-none sm:text-sm`}
                        aria-invalid="true"
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            <div
              className={`${
                atBottom ? "" : "md:shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)]"
              } z-10 bg-gray-50 px-4 py-8 transition-all md:sticky  md:bottom-0 md:px-16`}
            >
              <Button
                disabled={saveDisabled}
                loading={saving}
                text={props ? "Save changes" : "Add Network"}
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

function AddEditNetworkButton({
  setShowAddEditNetworkModal,
}: {
  setShowAddEditNetworkModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { nextPlan, exceededLinks } = useWorkspace();
  const { queryParams } = useRouterStuff();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const existingModalBackdrop = document.getElementById("modal-backdrop");
    // only open modal with keyboard shortcut if:
    // - c is pressed
    // - user is not pressing cmd/ctrl + c
    // - user is not typing in an input or textarea
    // - there is no existing modal backdrop (i.e. no other modal is open)
    // - workspace has not exceeded links limit
    if (
      e.key === "c" &&
      !e.metaKey &&
      !e.ctrlKey &&
      target.tagName !== "INPUT" &&
      target.tagName !== "TEXTAREA" &&
      !existingModalBackdrop &&
      !exceededLinks
    ) {
      e.preventDefault(); // or else it'll show up in the input field since that's getting auto-selected
      setShowAddEditNetworkModal(true);
    }
  }, []);

  // listen to paste event, and if it's a URL, open the modal and input the URL
  const handlePaste = (e: ClipboardEvent) => {
    const pastedContent = e.clipboardData?.getData("text");
    const target = e.target as HTMLElement;
    const existingModalBackdrop = document.getElementById("modal-backdrop");

    // make sure:
    // - pasted content is a valid URL
    // - user is not typing in an input or textarea
    // - there is no existing modal backdrop (i.e. no other modal is open)
    // - workspace has not exceeded links limit
    if (
      pastedContent &&
      isValidUrl(pastedContent) &&
      target.tagName !== "INPUT" &&
      target.tagName !== "TEXTAREA" &&
      !existingModalBackdrop &&
      !exceededLinks
    ) {
      setShowAddEditNetworkModal(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("keydown", onKeyDown),
        document.removeEventListener("paste", handlePaste);
    };
  }, [onKeyDown]);

  return (
    <Button
      text="Create link"
      shortcut="C"
      disabledTooltip={
        exceededLinks ? (
          <TooltipContent
            title="Your workspace has exceeded its monthly links limit. We're still collecting data on your existing links, but you need to upgrade to add more links."
            cta={`Upgrade to ${nextPlan.name}`}
            onClick={() => {
              queryParams({
                set: {
                  upgrade: nextPlan.name.toLowerCase(),
                },
              });
            }}
          />
        ) : undefined
      }
      onClick={() => setShowAddEditNetworkModal(true)}
    />
  );
}

export function useAddEditNetworkModal({
  props,
}: {
  props?: UserAdvertiserWithNameProps;
} = {}) {
  const [showAddEditNetworkModal, setShowAddEditNetworkModal] = useState(false);

  const AddEditNetworkModalCallback = useCallback(() => {
    return (
      <AddEditNetworkModal
        showAddEditNetworkModal={showAddEditNetworkModal}
        setShowAddEditNetworkModal={setShowAddEditNetworkModal}
        props={props}
      />
    );
  }, [showAddEditNetworkModal, setShowAddEditNetworkModal]);

  const AddEditNetworkButtonCallback = useCallback(() => {
    return (
      <AddEditNetworkButton
        setShowAddEditNetworkModal={setShowAddEditNetworkModal}
      />
    );
  }, [setShowAddEditNetworkModal]);

  return useMemo(
    () => ({
      showAddEditNetworkModal,
      setShowAddEditNetworkModal,
      AddEditNetworkModal: AddEditNetworkModalCallback,
      AddEditNetworkButton: AddEditNetworkButtonCallback,
    }),
    [
      showAddEditNetworkModal,
      setShowAddEditNetworkModal,
      AddEditNetworkModalCallback,
      AddEditNetworkButtonCallback,
    ],
  );
}
