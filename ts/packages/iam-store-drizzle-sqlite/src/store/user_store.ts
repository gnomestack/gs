import { and, eq, getTableColumns } from "drizzle-orm"
import { z } from "zod"
import {
  BaseSQLiteDatabase,
  SQLiteColumn,
  SQLiteInsertValue,
  SQLiteTableWithColumns,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core"
import { userTable } from "../schema/users.js"


export type SqliteClient = BaseSQLiteDatabase<"sync" | "async", any, any>


export interface NewUser {
    organizationId?: number
    email: string
    name?: string
    isLocked?: boolean
    isBlocked?: boolean
    emailVerifiedAt?: number
    imageUrl?: string
}

export interface User {
    id: number
    organizationId: number
    email: string
    name?: string
    emailVerifiedAt?: Date,
    imageUrl?: string
    isLocked: boolean
    isBlocked: boolean
    createdAt: Date
    updatedAt?: Date
}

export async function createUserWithCredentials(client: SqliteClient, newUser: NewUser & { password: string }) {
    const user = createUser(client, newUser);
}

export async function createUser(client: SqliteClient, newUser: NewUser) {
       

 
  const emailSlug = newUser.email.toLowerCase().trim();
  const emailMatch = emailSlug === newUser.email;
  const nameSlug = newUser.name ? newUser.name.toLowerCase().trim() : null;
  const nameMatch = nameSlug === newUser.name;

  const user : SQLiteInsertValue<typeof userTable> = {
      organizationId: newUser.organizationId || 1,
      isLocked: newUser.isLocked,
      isBlocked: newUser.isBlocked,
      email: emailMatch ? null : newUser.email,
      emailSlug: emailSlug,
      name: nameMatch ? null : newUser.name,
      nameSlug: nameMatch ? null : nameSlug,
      emailVerifiedAt: null,
      createdAt: new Date(),
      updatedAt: null,
  }

  const value =  await client.insert(userTable)
    .values(user)
    .returning()
    .get();

   return {
      id: value.id,
      organizationId: value.organizationId,
      email: value.email ?? value.emailSlug,
      name: value.name ?? value.nameSlug,
      isBlocked: value.isBlocked,
      isLocked: value.isLocked,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
      emailVerifiedAt: value.emailVerifiedAt,
      imageUrl: value.imageUrl,
   } as User 
}