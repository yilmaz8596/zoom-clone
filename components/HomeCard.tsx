import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  onClick: () => void;
  className: string;
}
function HomeCard({
  img,
  title,
  description,
  onClick,
  className,
}: HomeCardProps) {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt="group" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-xl font-normal">{description}</p>
      </div>
    </div>
  );
}

export default HomeCard;
