const API_URL =
  import.meta.env.VITE_API_URL || 'https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api/Auth';

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
  const res = await fetch('https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api/Auth/me', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

export async function logoutUser() {
  await fetch('https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api/Auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getUserIdFromHeader(): Promise<string | null> {
  const res = await fetch('https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api/Auth/me');
  if (!res.ok) return null;
  const data = await res.json();
  return data?.userId ?? null;
}
