import NavHome from "@/components/nav/NavHome";
import NavAction from "@/components/nav/NavAction";
import NavItem from "@/components/nav/NavItem";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db/db";
import { members, servers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function NavSidebar({ userData }) {
/*	const servers = await db.query.servers.findMany({
		with: {
			members: {
				where: (members) => eq(members.userId, userData.id),
			},
		},
	}); */
	
	const joinedServers = await db.select({ servers })
		.from(members)
		.innerJoin(servers, eq(members.userId, userData.id));
	
	return (
		<div className="space-y-4 flex flex-col items-center h-full text-primary w-full
			dark:bg-[#1E1F22] py-3">
			<NavHome />
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<ScrollArea className="flex-1 w-full">
				{
					joinedServers.map(({ servers: server }) => (
						<div key={server.id} className="mb-4">
							<NavItem id={server.id} name={server.name} avatarUrl={server.avatarUrl} />
						</div>
					))
				}
			</ScrollArea>
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
			<NavAction />
		</div>
	);
}

export default NavSidebar;
