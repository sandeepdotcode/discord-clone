import AcceptInviteCard from '@/components/server/AcceptInviteCard';
import InvalidInviteCard from '@/components/server/InvalidInviteCard';
import { db } from '@/lib/db/db';
import { members, servers, users } from '@/lib/db/schema';
import { getCurrentUserInActions } from '@/lib/getCurrentUser';
import { and, eq } from 'drizzle-orm';
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

	const [ serverData ] = await db.selectDistinct()
		.from(servers)
		.where(eq(servers.inviteCode, params.inviteCode));

	if (!serverData) {
		return (<InvalidInviteCard />);
	}

	// checks if current user is already a member of the server
	const [ serverMembership ] = await db.selectDistinct({ members })
		.from(users)
		.innerJoin(members, eq(members.userId, users.id))
		.innerJoin(servers, eq(servers.id, members.serverId))
		.where(and(eq(servers.inviteCode, params.inviteCode), eq(users.id, currentUserProfile.id)));

	return (
		<AcceptInviteCard isAlreadyJoined={serverMembership !== undefined} server={serverData} />
	);
}

export default AcceptInvitePage;
