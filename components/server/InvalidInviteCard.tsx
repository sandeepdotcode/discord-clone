"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function InvalidInviteCard() {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const goToHome = () => {
		setIsLoading(true);
		router.push('/');
	};
		
	return (
		<Card className="w-full h-full md:w-[500px] md:h-auto rounded-md flex flex-col items-center p-4 bg-[#313338] border-none">
			<CardHeader className="flex flex-col items-center gap-2">
				<CardTitle className="text-white/90">Invalid Invite!</CardTitle>
				<CardDescription className="text-zinc-400 text-bold dark:text-zinc-400">This invite link is invalid. Request the server admin for a new link.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col space-y-4 w-full">
				<Button variant="default" className="bg-white/80 text-zinc-800 hover:bg-white/60" onClick={goToHome} disabled={isLoading}>Go To Home</Button>
			</CardContent>
		</Card>
	);
}

export default InvalidInviteCard;
