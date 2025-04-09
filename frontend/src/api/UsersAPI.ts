import { User } from '../types/User';

const API_URL =
  'https://intexapi-1-1-backend-g5b4ckc3cwb2e5en.eastus-01.azurewebsites.net/api';

export const getUsers = async (): Promise<User[] | null> => {
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
