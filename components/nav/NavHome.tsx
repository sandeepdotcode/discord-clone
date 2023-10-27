"use client"

import { HomeIcon } from "lucide-react";
import ActionTooltip from "./ActionTooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function NavHome() {
	const pathname = usePathname();
	const router = useRouter();

	const openHome = () => {
		router.push(`/`);
	};

	return (
		<ActionTooltip side="right" align="center" label="Home">
			<button
				onClick={openHome}
				className="group relative flex items-center">
				<div className={cn(
					"absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
					pathname !== "/" && "group-hover:h-[20px]",
					pathname === "/" ? "h-[36px]" : "h-8px"
					)} />
				<div className={cn(
					`relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
						transition-all overflow-hidden justify-center items-center group-hover:text-white/90 group-hover:bg-pink-400
						dark:group-hover:bg-pink-500`,
					pathname === "/" && "bg-primary/10 rounded-[16px] bg-pink-400 dark:bg-pink-500 text-white/90"
				)}>
					<HomeIcon className="brightness-90" />
				</div>
			</button>
		</ActionTooltip>
	);
}

export default NavHome;
