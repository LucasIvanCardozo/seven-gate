'use server';
import prisma from './db';

export async function fetchUsers() {
  const users = await prisma.users.findMany();
  return users;
}

export async function fetchCategories() {
  const categories = await prisma.categories.findMany();
  return categories;
}
