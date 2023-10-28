"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateServerMenu from "./CreateServerMenu";
import { useEffect, useState } from "react";
import JoinServer from "./JoinServer";
import CreateServerForm from "./CreateServerForm";

interface InitialModalProps {
	username: string;
};

function InitialModal({
	username
	}: InitialModalProps ) {
	const [isMounted, setIsMounted] = useState(false);
	const [currentContent, setCurrentContent] = useState('menu');
	const [isOpen, setIsOpen] = useState(true);

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

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent className="bg-white dark:bg-white text-black p-0 overflow-hidden">
				{ currentContent === 'menu' && <CreateServerMenu createForm={goToForm} joinForm={goToJoin} isFirst={true} /> }
				{ currentContent === 'form' && <CreateServerForm backFn={goBackToMenu} username={username} closeModal={closeModal} /> }
				{ currentContent === 'join' && <JoinServer backFn={goBackToMenu} closeModal={closeModal} /> }
			</DialogContent>
		</Dialog>
	);
}

export default InitialModal;
