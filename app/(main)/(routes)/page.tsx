import LogoutBtn from '@/components/auth/LogoutBtn';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { db } from '@/lib/db/db';
import { eq } from 'drizzle-orm';
import { members, users } from '@/lib/db/schema';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import InitialModal from '@/components/modals/InitialModal';
import Image from 'next/image';
import { getInitials } from '@/lib/utils';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { 
    data: { user }
  } = await supabase.auth.getUser();

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user?.id),
  });

  const memberShip = await db
    .select()
    .from(members)
    .where(eq(members.userId, user?.id));

  const username = (userData?.displayName ? userData.displayName : userData?.username) || "My";

  return (
    <div className="flex flex-col items-start h-full">
      <div className="h-8 w-full flex justify-end gap-4 p-2">
        <ModeToggle />
        <LogoutBtn />
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
        <div className="h-[88px] w-[88px] rounded-md overflow-hidden relative">
          { userData?.avatarUrl
            ? <Image fill src={userData.avatarUrl} alt='' />
            : <div className="h-full w-full flex justify-center items-center dark:bg-zinc-600 text-3xl">
                { getInitials(username) }
              </div>
          }
        </div>
        <div className='text-3xl font-bold dark:text-primary/80'>Hello, { userData?.displayName ? userData.displayName : userData?.username }</div>
        <div className="text-2xl font-bold dark:text-primary/80">Welcome to <span className="text-pink-600">Moocord</span>!</div>
      </div>
      { !memberShip.length && <InitialModal username={username} /> }
      <div className="flex justify-end w-full p-4 text-sm text-bold dark:text-primary/70">This is a protected route!</div>
    </div>
  )
}
