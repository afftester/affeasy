import { cn } from "@dub/utils";
import Image from "next/image";
import { Badge } from "@dub/ui/src/badge-marketing";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-0 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  imgSrc,
  badge,
}: {
  className?: string;
  title: string;
  imgSrc: string;
  badge?: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input flex flex-col space-y-4 rounded-xl border border-transparent bg-white p-4  dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        {badge && (
          <Badge variant="secondary" className="absolute right-0 top-0 z-10">
            {badge}
          </Badge>
        )}
        <Image
          src={imgSrc}
          alt={title}
          width={200}
          height={200}
          className="rounded-xl object-cover"
        />
        <div className="mb-2 mt-2 text-center font-sans">{title}</div>
      </div>
    </div>
  );
};
