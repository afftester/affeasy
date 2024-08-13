import { useRouterStuff } from "@dub/ui";
import { fetcher } from "@dub/utils";
import useSWR from "swr";

export default function networkCount({
  groupBy,
}: {
  groupBy?: "advertiserId";
} = {}) {
  const { getQueryString } = useRouterStuff();

  const { data, error } = useSWR<any>(
    `/api/user/networks${getQueryString(
      {
        ...(groupBy && { groupBy }),
      },
      {
        ignore: ["import", "upgrade", "newRelationship"],
      },
    )}`,
    fetcher,
    {
      dedupingInterval: 30000,
      keepPreviousData: true,
    },
  );

  const relationshipsExist = data && data.length > 0 ? 1 : 0;

  return {
    data: relationshipsExist,
    loading: !error && !data,
    error,
  };
}
