import { db } from "@/lib/db/db";
import { channelType, channels, members as schemaMembers, servers } from "@/lib/db/schema";
import getCurrentUser from "@/lib/getCurrentUser";
import { asc, eq } from "drizzle-orm";
import ServerHeader from "@/components/server/ServerHeader";

interface ServerSidebarProps {
	serverId: string;
};

async function ServerSidebar({
	serverId
}: ServerSidebarProps ) {
	const currentUserProfile = await getCurrentUser();

	const server = await db.query.servers.findFirst({
		where: eq(servers.id, serverId),
		with: {
			channels: {
				orderBy: [asc(channels.createdAt)],
			},
			members: {
				with: {
					user: {},
				},
				orderBy: [asc(schemaMembers.role)],
			}
		}
	});

	const textChannels = server?.channels.filter((channel) => channel.type === channelType.enumValues[0]);
	const audioChannels = server?.channels.filter((channel) => channel.type === channelType.enumValues[1]);
	const videoChannels = server?.channels.filter((channel) => channel.type === channelType.enumValues[2]);
	const members = server?.members.filter((member) => member.userId !== currentUserProfile.id);

	const userRole = server?.members.find((member) => member.userId === currentUserProfile.id)?.role;

	return (
		<div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
			<ServerHeader server={server} role={userRole} />
		</div>
	);
}

export default ServerSidebar;
