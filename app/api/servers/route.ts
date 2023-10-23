import { db } from "@/lib/db/db";
import randomstring from 'randomstring';
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

import type { Database } from '@/lib/database.types'
import { channels, members, servers } from "@/drizzle/schema";

export async function POST(req: Request) {
	try {
		const { name } = await req.json();
		const supabase = createRouteHandlerClient<Database>({ cookies });
		const { data: { user } } = await supabase.auth.getUser();

		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const inviteCode = randomstring.generate({
			length: 15,
			charset: 'alphanumeric',
		});

		const [ newServer ] = await db.insert(servers).values({
			name,
			userId: user.id,
			inviteCode,
		})
		.returning();

		const newChannels = await db.insert(channels).values([
			{
				name: 'welcome',
				userId: user.id,
				serverId: newServer.id,
			},
			{
				name: 'general',
				userId: user.id,
				serverId: newServer.id,
			}
		])
		.returning();

		const newMemberShips = await db.insert(members).values({
			role: "admin",
			userId: user.id,
			serverId: newServer.id,
		})
		.returning();


		console.log(newServer);
		return NextResponse.json(newServer);
	} catch (error) {
		console.error("[SERVERS_POST]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
