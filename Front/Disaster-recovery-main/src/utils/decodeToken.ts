export const decodeToken = (token: string): 'admin' | 'viewer' | 'reporter' => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded.role || 'viewer';
  } catch (error) {
    console.error('Error decoding token:', error);
    return 'viewer';
  }
};