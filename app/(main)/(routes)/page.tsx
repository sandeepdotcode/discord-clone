import LogoutBtn from '@/components/auth/LogoutBtn';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { db } from '@/lib/db/db';
import { eq } from 'drizzle-orm';
import { members } from '@/lib/db/schema';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import InitialModal from '@/components/modals/InitialModal';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { 
    data: { user }
  } = await supabase.auth.getUser();

  const memberShip = await db
    .select()
    .from(members)
    .where(eq(members.userId, user?.id));

  return (
    <div className="flex flex-col items-start">
      <div className="text-3xl font-bold text-indigo-500">Hello World</div>
      <div>This is a protected route</div>
      <LogoutBtn />
      <ModeToggle />
      { !memberShip.length && <InitialModal /> }
    </div>
  )
}
