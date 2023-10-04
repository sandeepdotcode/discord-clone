import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) {
    redirect('/login');
  }

  const { 
    data: publicUser,
  } = await supabase.from("users").select("username").eq("id", session.user.id).single();

  if (publicUser?.username === null) {
    redirect('/sign-up/initial-setup');
  }

  return (
    <>{ children }</>
  )
}

export default MainLayout;
