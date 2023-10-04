"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateServerMenu from "./CreateServerMenu";
import { useEffect, useState } from "react";
import JoinServer from "./JoinServer";
import CreateServerForm from "./CreateServerForm";

function InitialModal() {
	const [isMounted, setIsMounted] = useState(false);
	const [currentContent, setCurrentContent] = useState('menu');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const goBackToMenu = () => {
		setCurrentContent('menu');
	};

	const goToForm = () => {
		setCurrentContent('form');
	};

	const goToJoin = () => {
		setCurrentContent('join');
	};

	if (!isMounted) {
		return null;
	}

	return (
		<Dialog open>
			<DialogContent className="bg-white dark:bg-white text-black p-0 overflow-hidden">
				{ currentContent === 'menu' && <CreateServerMenu createForm={goToForm} joinForm={goToJoin} /> }
				{ currentContent === 'form' && <CreateServerForm backFn={goBackToMenu} /> }
				{ currentContent === 'join' && <JoinServer backFn={goBackToMenu} /> }
			</DialogContent>
		</Dialog>
	);
}

export default InitialModal;
