"use client";

export default function VideoPreview() {
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
              poster={`/assets/preview/demo.webp`}
              className="h-auto w-full"
            >
              <source
                src={`https://www.ritanshudokania.xyz/assets/videos/demo.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
