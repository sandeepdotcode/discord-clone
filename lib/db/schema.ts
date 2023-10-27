import { pgTable, unique, pgEnum, uuid, text, boolean, timestamp, index, foreignKey, primaryKey } from "drizzle-orm/pg-core"

import { relations, sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const userStatus = pgEnum("user_status", ['ONLINE', 'OFFLINE'])
export const memberRole = pgEnum("member_role", ['admin', 'moderator', 'guest'])
export const channelType = pgEnum("channel_type", ['text', 'audio', 'video'])


export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	username: text("username"),
	displayName: text("display_name"),
	avatarUrl: text("avatar_url"),
	status: userStatus("status").default('OFFLINE'),
	showStatus: boolean("show_status").default(true),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		usersUsernameKey: unique("users_username_key").on(table.username),
	}
});

export const userRelations = relations(users, ({ many }) => ({
	servers: many(servers),
	channels: many(channels),
	memberships: many(members),
}));

export const servers = pgTable("servers", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: text("name").notNull(),
	avatarUrl: text("avatar_url"),
	inviteCode: text("invite_code").notNull(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userIdIdx: index("servers_user_id_idx").on(table.userId),
		serversInviteCodeKey: unique("servers_invite_code_key").on(table.inviteCode),
	}
});

export const serverRelations = relations(servers, ({ one, many }) => ({
	creator: one(users, {
		fields: [servers.userId],
		references: [users.id],
	}),
	channels: many(channels),
	members: many(members),
}));

export const channels = pgTable("channels", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	name: text("name").notNull(),
	type: channelType("type").default('text'),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" } ),
	serverId: uuid("server_id").references(() => servers.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userIdIdx: index("channels_user_id_idx").on(table.userId),
		serverIdIdx: index("channels_server_id_idx").on(table.serverId),
		channelsNameKey: unique("channels_name_key").on(table.name, table.serverId),
	}
});

export const channelRelations = relations(channels, ({ one }) => ({
	server: one(servers, {
		fields: [channels.serverId],
		references: [servers.id],
	}),
	creator: one(users, {
		fields: [channels.userId],
		references: [users.id],
	}),
}));

export const members = pgTable("members", {
	role: memberRole("role").default('guest'),
	userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	serverId: uuid("server_id").notNull().references(() => servers.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userIdIdx: index("members_user_id_idx").on(table.userId),
		serverIdIdx: index("members_server_id_idx").on(table.serverId),
		membersPkey: primaryKey(table.userId, table.serverId)
	}
});

export const memberRelations = relations(members, ({ one }) => ({
	user: one(users, {
		fields: [members.userId],
		references: [users.id],
	}),
	server: one(servers, {
		fields: [members.serverId],
		references: [servers.id],
	}),
}));
