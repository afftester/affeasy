"use client";

import { useEffect, useState } from "react";

import type { RegionTableProps } from "./region-table";
import { RegionTable } from "./region-table";

export interface SimpleChartProps {
  staticFile: string;
  caption?: string;
}

export function SimpleChart({ staticFile, caption }: SimpleChartProps) {
  const [data, setData] = useState<RegionTableProps | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(staticFile);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [staticFile]);

  if (!data) return null;

  return <RegionTable {...data} caption={caption} />;
}
