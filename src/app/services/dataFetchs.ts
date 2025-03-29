"use server"

import { DB } from "./db"

export async function fetchUsers() {
    const users = await DB.user.findMany()
    return users
}

export async function fetchCategories() {
    //const categories = await prisma.categories.findMany()
    return []
}
