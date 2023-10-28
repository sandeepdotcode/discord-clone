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
	const [isJoining, setIsJoining] = useState(false);

	const router = useRouter();

	const acceptInvite = async () => {
		try {
			setIsJoining(true);
			const res = await axios.post(`/api/invite/${server.inviteCode}`);
			if (res.status === 200) {
				router.push(`/channels/${server.id}/${res.data.channels[0].id}`);
			}
			else {
				console.log(res.statusText);
			}
		} catch (error) {
			console.error(error);
			setIsJoining(false);
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
		<Card className="w-full h-full md:w-[500px] md:h-auto rounded-md flex flex-col items-center p-4 bg-[#313338] border-none">
			<div className="relative group flex mx-3 h-[56px] w-[56px]
					transition-all overflow-hidden bg-primary/10 text-primary rounded-[16px] mt-2">
				{ server.avatarUrl
					? <Image fill src={server.avatarUrl} alt="Server" />
					: <div className="h-full w-full flex justify-center items-center bg-zinc-700/90 text-xl">{ getInitials(server.name) }</div>
				}
			</div>
			<CardHeader>
				<CardDescription className="text-zinc-400">{ isAlreadyJoined ? "You are already a member of" : "You are invited to join" }</CardDescription>
				<CardTitle className="text-white/90">{ server.name }</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col space-y-4 w-full">
				{ isAlreadyJoined 
					? <Button variant="primary" onClick={openServer} disabled={isLoading}>Open Server</Button>
					: <Button variant="primary" onClick={acceptInvite} disabled={isJoining || isLoading}>
							{ isJoining ? "Joining Server..." : "Accept Invite" }
						</Button>
				}
				<Button variant="default" className="bg-white/80 text-zinc-800 hover:bg-white/60" onClick={goToHome} disabled={isLoading || isJoining}>Go To Home</Button>
			</CardContent>
		</Card>
	);
}

export default AcceptInviteCard;
