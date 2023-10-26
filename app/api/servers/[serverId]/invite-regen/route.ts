import { NextResponse } from "next/server";
import { getCurrentUserInRoute } from "@/lib/getCurrentUser";
import { servers } from "@/lib/db/schema";
import randomstring from 'randomstring';
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string }}
) {
	try {
		const currentUserProfile = await getCurrentUserInRoute();
		if (!currentUserProfile) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!params.serverId) {
			return new NextResponse("Server ID Missing", { status: 400 });
		}
		
		const newInviteCode = randomstring.generate({
			length: 15,
			charset: 'alphanumeric',
		});

		const [ server ] = await db.update(servers)
			.set({ inviteCode: newInviteCode })
			.where(eq(servers.id, params.serverId) && eq(servers.userId, currentUserProfile.id))
			.returning();

		return NextResponse.json(server);
	} catch (error) {
		console.log("[INVITE_REGEN]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
