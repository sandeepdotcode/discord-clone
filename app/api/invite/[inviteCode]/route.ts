import { NextResponse } from "next/server";
import { getCurrentUserInRoute } from "@/lib/getCurrentUser";
import { db } from "@/lib/db/db";
import { memberRole, members, servers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
	req: Request,
	{ params }: { params: { inviteCode: string }}
) {
	try {
		const currentUserProfile = await getCurrentUserInRoute();
		if (!currentUserProfile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params.inviteCode) {
			return new NextResponse("Invite Code Missing", { status: 400 });
		}

		const server = await db.query.servers.findFirst({
			where: eq(servers.inviteCode, params.inviteCode),
			with: {
				channels: {
					where: (channels, { eq }) => eq(channels.name, "welcome"),
				},
				members: {
					where: (members, { eq}) => eq(members.userId, currentUserProfile.id),
				},
			},
		});
		
		if (server?.members.length) {
			// already a member of server
		}

		// memberRole values = ["admin", "moderator", "guest"]
		const [ newMember ] =  await db.insert(members).values({
			userId: currentUserProfile.id,
			serverId: server.id,
			role: memberRole.enumValues[2],
		})
		.returning();

		if (!newMember) {
			// member not added
			return new NextResponse("Internal Error", { status: 500 });
		}
		return NextResponse.json(server);
	} catch (error) {
		console.log("[INVITE_REGEN]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
