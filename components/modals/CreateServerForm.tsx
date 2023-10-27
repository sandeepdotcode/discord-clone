"use client"

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import ImageUpload from '../custom/ImageUpload';
import { useState } from 'react';

const formSchema = z.object({
	avatarUrl: z.string(),
	name: z.string({
		required_error: "Server name is required",
		invalid_type_error: "Server name should be a string",
	}),
	/* avatarUrl: z.string({
		required_error: "Server avatar is required",
		invalid_type_error: "Image upload failed",
	}), */
});

function CreateServerForm({ backFn, username, closeModal }) {
	const form = useForm({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: {
			avatarUrl: "",
			name: `${username}'s Server`,
			// avatarURL: "https://avatars.githubusercontent.com/u/60999997?v=4",
		},
	});

	const [fileUrl, setFileUrl] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const isLoading  = form.formState.isSubmitting;

	const router = useRouter();

	const submitHandler = async (values: z.infer<typeof formSchema>) => {
		try {
			const actualValues = {
				name: values.name,
				avatarUrl: fileUrl,
			}
			
			const { data: welcomeChannel } = await axios.post("/api/servers", actualValues);
			form.reset()
			router.refresh();
			// window.location.reload();
			router.push(`/channels/${welcomeChannel.serverId}/${welcomeChannel.id}`); 
			closeModal();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<DialogHeader className="pt-8 px-6">
				<DialogTitle className="text-2xl text-center font-bold">Customize your server!</DialogTitle>
				<DialogDescription className="text-zinc-500 text-center">Give your new server a personality with a name and an icon. You can always change it later.</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8" id="createServerForm">
					<div className="space-y-8 px-6">
						<FormField
							control={form.control}
							name="avatarUrl"
							render={({ field }) => (
								<FormItem className="w-full flex justify-center mt-2">
									<FormControl>
										<ImageUpload field={field} fileUrl={fileUrl} setFileUrl={setFileUrl} avatarType="servers" inForm={true} setIsUploading={setIsUploading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
									<FormControl>
										<Input {...field} 
											disabled={isLoading}
											className="bg-zinc-300/50 dark:bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

					</div>
				</form>
			</Form>
			<DialogFooter className="bg-gray-100 px-6 py-4">
				<Button onClick={backFn} variant="secondary">Back</Button>
				<Button form="createServerForm" disabled={isLoading || isUploading} variant="primary">Create</Button>
			</DialogFooter>
		</>
	);
}

export default CreateServerForm;
