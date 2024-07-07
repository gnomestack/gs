import { sqliteTable, text, integer, blob, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { organizationTable } from './org';
import { is, sql } from 'drizzle-orm';

export const userTable = sqliteTable('iam_users', {
  id: integer("id").primaryKey(),
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizationTable.id, { onDelete: 'cascade' }),
  uid: text("uid")
    .unique("ux_iam_users_uid")
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  nameSlug: text("name_slug")
    .unique("ux_iam_users_slug"),
  email: text("email"),
  emailSlug: text("email_slug")
    .unique("ux_iam_users_email_slug")
    .notNull(),
  emailVerifiedAt: integer("email_verified_at", { mode: 'timestamp_ms' }),
  isLocked: integer("is_locked", { mode: 'boolean' })
    .notNull()
    .default(false),
  isBlocked: integer("is_blocked", { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: 'timestamp' })
    .notNull()
    .default(sql`now()`),
  updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const userProfileTable = sqliteTable('iam_user_profiles', {
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' })
        .unique("ux_iam_user_profiles_user_id"),
    image: text("image"),
    phone: text("phone", { length: 20  }),
    phoneVerifiedAt: integer("phone_verified_at", { mode: 'timestamp_ms' }),
    data: text("data", { mode: 'json' }),
    createdAt: integer("created_at", { mode: 'timestamp_ms' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp_ms' }),
});

export const userClaimTable = sqliteTable('iam_user_claims', {
    id: integer("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id,  { onDelete: 'cascade' }),
    type: text("type").notNull(),
    value: text("value").notNull(),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const userCredentialTable = sqliteTable('iam_user_credentials', {
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade'})
        .unique("ux_iam_user_credentials_user_id"),
    password: text("password").notNull(),
    isTemporary: integer("is_temporary", { mode: 'boolean' })
        .notNull()
        .default(false),
    failedAttempts: integer("failed_attempts")
        .notNull()
        .default(0),
    lastFailedAttemptAt: integer("last_failed_attempt_at", { mode: 'timestamp' }),
    passwordUpdatedAt: integer("password_updated_at", { mode: 'timestamp' }),
    lastLoginAt: integer("last_login_at", { mode: 'timestamp' }),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const userLoginAttemptTable = sqliteTable('iam_user_login_attempts', {
    id: integer("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    ipAddress: text("ip_address"),
    data: text("data", { mode: "json" }),
    timestamp: integer("timestamp", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
});

