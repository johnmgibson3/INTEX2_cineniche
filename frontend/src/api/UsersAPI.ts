import { User } from '../types/User';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api/users';

export const getUsers = async (): Promise<User[] | null> => {
  credentials: "include"
  try {
    const res = await fetch(`${API_URL}/all`);
    if (!res.ok)
      throw new Error(`Failed to fetch users. Status: ${res.status}`);
    const data = await res.json();
    return data.users ?? [];
  } catch (error) {
    console.error('getUsers error:', error);
    return null;
  }
};

export const getUser = async (userId: number): Promise<User | null> => {
  credentials: "include"
  try {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) throw new Error(`User not found: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getUser error:', error);
    return null;
  }
};

export const addUser = async (user: User): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return res.ok;
  } catch (error) {
    console.error('addUser error:', error);
    return false;
  }
};

export const updateUser = async (
  credentials: "include",
  userId: number,
  user: User
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/update/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return res.ok;
  } catch (error) {
    console.error('updateUser error:', error);
    return false;
  }
};

export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/delete/${userId}`, {
      method: 'DELETE',
    });

    return res.ok;
  } catch (error) {
    console.error('deleteUser error:', error);
    return false;
  }
};
