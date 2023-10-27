import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SetupForm from "./SetupForm";

async function InitialSetup() {
	const supabase = createServerComponentClient({ cookies });;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const {
		data: { username },
	} = await supabase.from("users").select("username").eq("id", session?.user.id).single();
	
	if (!session?.user) {
		redirect('/login');
	}

	if (username) {
		redirect('/');
	}

	return (
		<Card className="w-full h-full md:w-[500px] md:h-auto rounded-md flex flex-col items-center p-4 bg-[#313338] border-none">
			<CardHeader className="w-full text-white/90 flex items-center">
				<CardTitle>Set up your account</CardTitle>
			</CardHeader>
			<CardContent className="w-full">
				<SetupForm session={session} />
			</CardContent>
		</Card>
	);
}

export default InitialSetup;
