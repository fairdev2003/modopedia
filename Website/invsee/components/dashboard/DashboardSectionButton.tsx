import { cn } from "@/lib/utils";
import { ArrowRight, Dot } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";

interface DashboardSectionButtonProps {
  children?: ReactNode;
  className?: string;
  to?: string;
}

export default function DashboardSectionButton({
  children,
  className,
  to,
}: DashboardSectionButtonProps) {
  const [hovered, setHovered] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelcted] = useState<any>("");

  const variants: Variants = {
    animate: {
      opacity: [0, 1, 0],
      transition: { repeat: Infinity, duration: 2 },
    },
    initial: { opacity: 0 },
  };

  useEffect(() => {
    setSelcted(searchParams.get("section"));
  }, [searchParams]);
  return (
    <button
      onClick={() => {
        router.push(`/dashboard?section=${to ? to : "overview"}`);
      }}
      className={cn(
        `group bg-none overflow-hidden relative border-[1.5px] border-gray-800 select-none w-full h-[50px] rounded-xl ${selected === to ? "border-green-500 text-green-500 bg-none hover:bg-green-500/10 bg-green-500/10 font-[600]" : " text-white hover:border-green-500"} flex items-center px-3 gap-3 transition-colors justify-between`,
        className,
      )}
    >
      <div className="flex gap-3 justify-start items-center w-[90%]">
        {children}
      </div>
      {selected === to ? (
        <motion.div variants={variants} animate="animate" initial="initial">
          <Dot size={50} />
        </motion.div>
      ) : null}
    </button>
  );
}
