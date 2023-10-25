"use client"

import { Plus } from "lucide-react";
import ActionTooltip from "@/components/nav/ActionTooltip";
import { useModal } from "@/hooks/useModalStore";

function NavAction() {
	const { onOpen } = useModal();

	const handleButtonClick = () => {
		onOpen("createServer");
	};

	return (
		<div>
			<ActionTooltip side="right" align="center" label="add a server">
				<button className="group flex items-center" onClick={handleButtonClick}>
					<div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
						transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700
						group-hover:bg-emerald-500" >
						<Plus className="group-hover:text-white transition text-emerald-500" size={25} />
					</div>
				</button>
			</ActionTooltip>
		</div>
	);
};

export default NavAction;
