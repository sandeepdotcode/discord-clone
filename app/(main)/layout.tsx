import NavSidebar from "@/components/nav/NavSidebar";
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
  } = await supabase.from("users").select().eq("id", session.user.id).single();

  if (publicUser?.username === null) {
    redirect('/sign-up/initial-setup');
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavSidebar userData={publicUser} />
      </div>
      <main className="md:pl-[72px] h-full">
        { children }
      </main>
    </div>
  )
}

export default MainLayout;
