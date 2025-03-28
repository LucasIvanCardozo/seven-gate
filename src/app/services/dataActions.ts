'use server';
import prisma from './db';

export async function createUser(data: { name: string }) {
  try {
    const user = await prisma.users.create({
      data,
    });
    return user;
  } catch (error) {
    throw new Error('Error creating user: ' + error);
  }
}
