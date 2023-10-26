import { createRouteHandlerClient, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getCurrentUser() {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { 
    data: publicUser,
  } = await supabase.from("users").select().eq("id", session?.user.id).single();
  
  return publicUser;
}

async function getCurrentUserInRoute() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { 
    data: publicUser,
  } = await supabase.from("users").select().eq("id", session?.user.id).single();
  
  return publicUser;
}

export default getCurrentUser;
export { getCurrentUser as getCurrentUserInActions,
  getCurrentUserInRoute };
