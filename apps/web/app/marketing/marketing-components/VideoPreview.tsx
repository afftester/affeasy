"use client";
import { useState } from "react";

const features = [
  { label: "Fast & Compact", value: "1" },
  { label: "Search", value: "2" },
  { label: "Edit", value: "3" },
  { label: "Customize", value: "5" },
  { label: "Compare", value: "6" },
  { label: "AI-Powered Assistant", value: "7" },
];

export default function VideoPreview() {
  const [selectedFeature, setSelectedFeature] = useState("1");

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-8 sm:flex-row">
        <div className="w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-lg border border-gray-300 outline outline-1 outline-offset-4 outline-gray-300">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={`/assets/preview/${selectedFeature}.webp`}
              className="h-auto w-full"
            >
              <source
                src={`https://app.jsoncrack.com/assets/videos/p${selectedFeature}.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* <p className="mt-2 text-center text-sm text-gray-500">
            Previews are from the Premium version of the app
          </p> */}
        </div>
      </div>
    </div>
  );
}
