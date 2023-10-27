"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getInitials } from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Server {
	id: String;
	name: String;
	avatarUrl: string;
	inviteCode: String;
};

interface AcceptInviteProps {
	isAlreadyJoined: Boolean;
	server: Server;
};

function AcceptInviteCard({
	isAlreadyJoined,
	server
}: AcceptInviteProps) {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const acceptInvite = async () => {
		try {
			setIsLoading(true);
			await axios.post(`/api/servers/[inviteCode]`);
			router.push(`/channels/${server.id}/welcome`);
		} catch (error) {
			console.error(error);
		}
	};

	const openServer = () => {
		setIsLoading(true);
		router.push(`/channels/${server.id}/welcome`);
	};

	const goToHome = () => {
		setIsLoading(true);
		router.push('/');
	};
		
	return (
		<Card className="w-full h-full md:w-[500px] md:h-auto rounded-md flex flex-col items-center p-4 bg-[#313338]">
			<div className="relative group flex mx-3 h-[56px] w-[56px]
					transition-all overflow-hidden bg-primary/10 text-primary rounded-[16px] mt-2">
				{ server.avatarUrl
					? <Image fill src={server.avatarUrl} alt="Server" />
					: <div className="h-full w-full flex justify-center items-center">{ getInitials(server.name) }</div>
				}
			</div>
			<CardHeader>
				<CardDescription>{ isAlreadyJoined ? "You are already a member of" : "You are invited to join" }</CardDescription>
				<CardTitle>{ server.name }</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col space-y-4 w-full">
				{ isAlreadyJoined 
					? <Button variant="primary" onClick={openServer} disabled={isLoading}>Open Server</Button>
					: <Button variant="primary" onClick={acceptInvite} disabled={isLoading}>
							{ isLoading ? "Joining Server..." : "Accept Invite" }
						</Button>
				}
				<Button variant="secondary" onClick={goToHome} disabled={isLoading}>Go To Home</Button>
			</CardContent>
		</Card>
	);
}

export default AcceptInviteCard;
