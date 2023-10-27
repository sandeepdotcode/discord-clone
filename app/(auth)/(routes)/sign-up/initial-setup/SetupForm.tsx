"use client"

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, 
	FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/custom/ImageUpload';
import { useState } from 'react';

const dotMsg = "Username cannot contain repeating dots";
const charMsg = "Please only use numbers, letters, underscores _, or periods .";

const formSchema = z.object({
	avatarUrl: z.string(),
	username: z.string({
		required_error: "Username is required",
		invalid_type_error: "Username should be a string",
	}).min(2, { 
		message: "Username should contain at least 2 characters" 
	}).max(50, {
		message: "Username should not be longer than 50 characters" 
	}).refine((val) => /^[a-zA-Z0-9_.]*$/.test(val), {
		message: charMsg,
	}).refine((val) => !/\.{2,}/.test(val) , {
		message: dotMsg,
	}),
	dispName: z.string(),
	showStatus: z.boolean(),
});

function SetupForm({ session }: { session: Session | null}) {
	const supabase = createClientComponentClient<Database>();
	const user = session?.user;
	const router = useRouter();

	const [fileUrl, setFileUrl] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: {
			avatarUrl: "",
			username: "",
			dispName: "",
			showStatus: true,
		},
	});

	const submitHandler = async (values: z.infer<typeof formSchema>) => {
		const { error } = await supabase.from("users").update({
			avatar_url: fileUrl,
			username: values.username,
			display_name: values.dispName,
			show_status: values.showStatus,
			updated_at: new Date().toISOString(),
		}).eq("id", user?.id); 

		if (!error) {
			router.push('/');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
				<FormField
					control={form.control}
					name="avatarUrl"
					render={({ field }) => (
						<FormItem className='flex justify-center flex-col items-center'>
							<FormControl className="w-full flex justify-center">
								<ImageUpload field={field} avatarType="users" fileUrl={fileUrl} setFileUrl={setFileUrl}
									setIsUploading={setIsUploading} inForm={true} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="uppercase text-xs font-bold text-zinc-400">Username<span className="text-red-700">*</span></FormLabel>
							<FormControl>
								<Input {...field} className="bg-[#1E1F22] text-white border-none" />
							</FormControl>
							<FormDescription className="text-xs font-bold text-zinc-400">Please only use numbers, letters, underscores _, or periods .</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dispName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="uppercase text-xs font-bold text-zinc-400">Display Name</FormLabel>
							<FormControl>
								<Input {...field} className="bg-[#1E1F22] text-white border-none" />
							</FormControl>
							<FormDescription className="text-xs font-bold text-zinc-400">This is how others see you. You can use special characters.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="showStatus"
					render={({ field }) => (
						<FormItem className="flex justify-between items-center">
							<FormLabel className="uppercase text-xs font-bold text-zinc-400">Show online status</FormLabel>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange}
									className="dark:data-[state=checked]:bg-pink-400 dark:data-[state=unchecked]:bg-pink-200 data-[state=checked]:bg-pink-400 data-[state=unchecked]:bg-pink-200" />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" variant="primary" className="w-full" disabled={isUploading}>
					{ isUploading ? "Uploading Avatar..." : "Submit" }
				</Button>
			</form>
		</Form>
	);
}

export default SetupForm;
