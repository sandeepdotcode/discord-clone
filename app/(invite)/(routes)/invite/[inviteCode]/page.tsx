import AcceptInviteCard from '@/components/server/AcceptInviteCard';
import { db } from '@/lib/db/db';
import { members, servers } from '@/lib/db/schema';
import { getCurrentUserInActions } from '@/lib/getCurrentUser';
import { eq, inArray } from 'drizzle-orm';
import { redirect } from 'next/navigation';

interface InviteCodePageProps {
	params: {
		inviteCode: string;
	};
};

async function AcceptInvitePage({
	params
}: InviteCodePageProps) {
	const currentUserProfile = await getCurrentUserInActions();

	if (!currentUserProfile) {
		redirect('/login');
	}

	if (!params.inviteCode) {
		redirect('/');
	}

	const [ alreadyJoinedServer ] = await db.selectDistinct({ servers })
		.from(members)
		.innerJoin(servers, eq(members.serverId, servers.id))
		.where(eq(servers.inviteCode, params.inviteCode));

	const [ serverData ] = await db.selectDistinct()
		.from(servers)
		.where(eq(servers.inviteCode, params.inviteCode));

	return (
		<AcceptInviteCard isAlreadyJoined={alreadyJoinedServer !== undefined} server={serverData} />
	);
}

export default AcceptInvitePage;
