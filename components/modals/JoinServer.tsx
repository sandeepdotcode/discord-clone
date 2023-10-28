"use client"

import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	inviteCode: z.string({
		required_error: "Invite code is required",
		invalid_type_error: "Invite code should be a string",
	}).length(15, {
		message: "Invite code should be 15 characters"
	}),
});

function JoinServer({ backFn, closeModal }) {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ notFound, setNotFound ] = useState(false);
	const [ isMember, setIsMember ] = useState(false);

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: {
			inviteCode: "",
		},
	});

	const joinServer = async (values: z.infer<typeof formSchema>) => {
		try {
			if (notFound) {
				setNotFound(false);
			}
			setIsLoading(true);
			const res = await axios.post(`/api/invite/${values.inviteCode}`);
			if (res.data.notFound) {
				setNotFound(true);
				setIsLoading(false);
				setTimeout(() => {
					setNotFound(false);
				}, 1500);
			} else if (res.data.isMember) {
				setIsMember(true);
				setIsLoading(false);
				setTimeout(() => {
					setIsMember(false);
				}, 1500);
			} else if (res.status === 200) {
				router.push(`/channels/${res.data.id}/${res.data.channels[0].id}`);
				router.refresh;
				closeModal();
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	return (
		<>
			<DialogHeader className="pt-8 px-6">
				<DialogTitle className="text-2xl text-center font-bold">Join a Server!</DialogTitle>
				<DialogDescription className="text-zinc-500 text-center">Enter an invite below to join an existing server.</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(joinServer)} className="space-y-8 px-6" id="joinServerForm">
						<FormField
							control={form.control}
							name="inviteCode"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Invite Code<span className="text-red-700 ml-1">*</span></FormLabel>
									<FormControl>
										<Input {...field} 
											disabled={isLoading}
											className="bg-zinc-300/50 dark:bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
											placeholder="in1k6c96XdSLGVG" />
									</FormControl>
									<FormMessage />
									<FormDescription className="text-zinc-500 dark:text-zinc-500 text-xs">
										{ isMember && <div className="font-bold text-red-500">Already a member!</div> }
										{ notFound && <div className="font-bold text-red-500">Invalid Invite Code!</div> }
										<div className="font-bold uppercase pt-4">
											Invites should look like
										</div>
										<div className="text-sm">
											in1k6c96XdSLGVG
										</div>
									</FormDescription>
								</FormItem>
							)}
						/>
				</form>
			</Form>
			<DialogFooter className="bg-gray-100 px-6 py-4">
				<div className="w-full md:flex md:justify-between">
					<Button onClick={backFn} variant="secondary">Back</Button>
					<Button variant="primary" disabled={isLoading} form="joinServerForm">Join Server</Button>
				</div>
			</DialogFooter>
		</>
	);
}

export default JoinServer;
