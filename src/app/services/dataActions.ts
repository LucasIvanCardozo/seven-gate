"use server"

import { DB } from "./db"

export async function createUser(data: { name: string }) {
    try {
        const user = await DB.user.create({
            data,
        })
        return user
    } catch (error) {
        throw new Error("Error creating user: " + error)
    }
}
