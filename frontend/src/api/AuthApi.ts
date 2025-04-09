const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/Auth';

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    return res.ok
      ? { success: true, message: 'Registration successful!' }
      : { success: false, message: data.message || 'Registration failed.' };
  } catch (err) {
    console.error('registerUser error:', err);
    return { success: false, message: 'Network or server error.' };
  }

  
};


export async function fetchUser() {
  const res = await fetch('https://localhost:5000/api/Auth/me', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

export async function logoutUser() {
  await fetch('https://localhost:5000/logout', {
    method: 'POST',
    credentials: 'include',
  });
}