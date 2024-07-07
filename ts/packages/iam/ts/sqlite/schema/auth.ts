import { sqliteTable, text, integer, blob, uniqueIndex, primaryKey } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';
import { is, sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/mysql-core';
import type {
    Adapter,
    AdapterAccount,
    AdapterAccountType,
    AdapterAuthenticator,
    AdapterSession,
    AdapterUser,
    VerificationToken,
  } from "@auth/core/adapters"


export const userAccounts = sqliteTable('iam_auth_user_accounts', {
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: "cascade" }),
    userUuid: text("user_uuid").notNull(),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
},
(account) => ({
  compositePk: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}));

const sessionsTable = sqliteTable("iam_auth_session", {
  sessionToken: text("session_token").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  userUuid: text("user_uuid").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
})

const verificationTokens = sqliteTable(
  "iam_verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  },
  (verficationToken) => ({
    compositePk: primaryKey({
      columns: [verficationToken.identifier, verficationToken.token],
    }),
  })
)

const authenticatorsTable = sqliteTable(
  "iam_auth_authenticator",
  {
    credentialId: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    userUuid: text("user_uuid")
        .notNull(),
    providerAccountId: text("provider_account_id")
        .notNull(),
    credentialPublicKey: text("credential_public_key")
        .notNull(),
    counter: integer("counter")
        .notNull(),
    credentialDeviceType: text("credential_device_type")
        .notNull(),
    credentialBackedUp: integer("credential_backed_up", {
        mode: "boolean",
        }).notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialId],
    }),
  })
);