type Region = any;
type ResponseTimeMetricsByRegion = any;

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dub/ui";

import { formatNumber } from "./metrics-card";
import { SimpleChart } from "./simple-chart";
import { any } from "zod";

const flyRegionsDict = {
  ams: {
    code: "ams",
    name: "",
    location: "Amsterdam, Netherlands",
    flag: "🇳🇱",
  },
  iad: {
    code: "iad",
    name: "us-east-1",
    location: "Ashburn, Virginia, USA",
    flag: "🇺🇸",
  },
  jnb: {
    code: "jnb",
    name: "",
    location: "Johannesburg, South Africa",
    flag: "🇿🇦",
  },
  hkg: {
    code: "hkg",
    name: "",
    location: "Hong Kong, Hong Kong",
    flag: "🇭🇰",
  },
  gru: {
    code: "gru",
    name: "",
    location: "Sao Paulo, Brazil",
    flag: "🇧🇷",
  },
  syd: {
    code: "syd",
    name: "",
    location: "Sydney, Australia",
    flag: "🇦🇺",
  },
} as const;

export interface RegionTableProps {
  regions: Region[];
  data: {
    regions: Region[];
    data: (Partial<Record<Region, string>> & { timestamp: string })[];
  };
  metricsByRegion: ResponseTimeMetricsByRegion[];
  caption?: string;
}

export function RegionTable({
  regions,
  data,
  metricsByRegion,
  caption = "A list of all the selected regions.",
}: RegionTableProps) {
  // console.log(JSON.stringify({ regions, data, metricsByRegion }, null, 2));
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Region</TableHead>
          <TableHead className="min-w-[300px]">Trend</TableHead>
          <TableHead className="w-[50px]">P50</TableHead>
          <TableHead className="w-[50px]">P95</TableHead>
          <TableHead className="w-[50px]">P99</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {regions
          .filter((region) => regions.includes(region))
          .map((region) => {
            const { code, flag, location } = flyRegionsDict[region];
            const metrics = metricsByRegion.find((m) => m.region === region);
            return (
              <TableRow key={region}>
                <TableCell>
                  <p className="text-muted-foreground text-xs">{location}</p>
                  <p className="font-mono text-xs">
                    {flag} {code}
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-medium">
                  {formatNumber(metrics?.p50Latency)}
                  <span className="text-muted-foreground text-xs font-normal">
                    ms
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatNumber(metrics?.p95Latency)}
                  <span className="text-muted-foreground text-xs font-normal">
                    ms
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatNumber(metrics?.p99Latency)}
                  <span className="text-muted-foreground text-xs font-normal">
                    ms
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">0</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
