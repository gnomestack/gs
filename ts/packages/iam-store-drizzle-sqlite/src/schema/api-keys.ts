import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, blob, uniqueIndex, primaryKey } from 'drizzle-orm/sqlite-core';
import { userTable } from './users.js';
import { roleTable } from './roles.js';

export const apiKeyTable = sqliteTable('iam_api_keys', {
    id: integer("id").primaryKey(),
    uid: text("uid")
        .unique("ux_iam_api_keys_uid")
        .notNull()
        .$defaultFn(() => crypto.randomUUID()),
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id),
    key: text("key", { length: 1024 })
        .unique("ux_iam_api_keys_key")
        .notNull(),
    expiresAt: integer("expires_at", { mode: 'timestamp_ms' }),
});

export const apiKeyClaimTable = sqliteTable('iam_api_key_claims', {
    id: integer("id").primaryKey(),
    uid: text("uid")
        .unique("ux_iam_api_key_claims_uid")
        .notNull()
        .$defaultFn(() => crypto.randomUUID()),
    apiKeyId: integer("api_key_id")
        .notNull()
        .references(() => apiKeyTable.id),
    type: text("type").notNull(),
    value: text("value").notNull(),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const apiKeyRoleTable = sqliteTable('iam_api_key_roles', {
    apiKeyId: integer("api_key_id")
        .notNull()
        .references(() => apiKeyTable.id, { onDelete: 'cascade' }),
    roleId: integer("role_id")
        .notNull()
        .references(() => roleTable.id, { onDelete: 'cascade' }),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
}, (apiKeyRole) => ({
    compositePK: primaryKey({
        columns: [apiKeyRole.apiKeyId, apiKeyRole
            .roleId],
    }),
}));