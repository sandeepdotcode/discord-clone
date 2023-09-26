import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function VerifyBanner() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { user },
	} = await supabase.auth.getUser();

  const { 
    data: publicUser,
  } = await supabase.from("users").select("username").eq("id", user?.id).single();

	if(user?.confirmed_at && publicUser?.username === null) {
		redirect('/sign-up/initial-setup');
	}

	if(publicUser?.username) {
		redirect('/');
	}

	return (
		<div>Please verify your email to continue</div>
	);
}

export default VerifyBanner;
