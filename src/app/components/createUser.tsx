'use client';
import { useEffect, useState } from 'react';
import { createUser } from '../services/dataActions';
import { users } from '@prisma/client';
import { fetchUsers } from '../services/dataFetchs';

export default function CreateUser() {
  const [users, setUsers] = useState<users[]>([]);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    const auxUsers = await fetchUsers();
    setUsers(auxUsers);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const name = data.name as string;

      if (!name) throw new Error('El nombre es requerido');
      await createUser({ name });
      updateUsers();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col border-2 p-2 my-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name">Nombre:</label>
        <input
          className="bg-white text-black"
          type="text"
          name="name"
          placeholder="Nombre del usuario"
        />
        <button
          type="submit"
          className="hover:bg-blue-900 hover:cursor-pointer"
        >
          Aceptar
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-2 p-2 my-2">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
