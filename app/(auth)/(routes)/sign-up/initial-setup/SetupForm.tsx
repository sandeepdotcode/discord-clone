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
import { redirect, useRouter } from 'next/navigation';

const dotMsg = "Username cannot contain repeating dots";
const charMsg = "Please only use numbers, letters, underscores _, or periods .";

const formSchema = z.object({
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onBlur",
		defaultValues: {
			username: "",
			dispName: "",
			showStatus: true,
		},
	});

	const submitHandler = async (values: z.infer<typeof formSchema>) => {
		const { error } = await supabase.from("users").update({
			username: values.username,
			display_name: values.dispName,
			show_status: values.showStatus,
			updated_at: new Date().toISOString(),
		}).eq("id", user?.id);

		if (!error) {
			// redirect('/login'); Throwing error
			// workaround below
			router.push('/');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username<span className="text-red-700">*</span></FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>Please only use numbers, letters, underscores _, or periods .</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dispName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Display Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>This is how others see you. You can use special characters.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="showStatus"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Show online status</FormLabel>
							<FormControl>
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default SetupForm;
