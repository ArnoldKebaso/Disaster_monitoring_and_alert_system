export const decodeToken = (token: string): 'admin' | 'viewer' | 'reporter' => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.role || 'viewer';
  } catch (error) {
    console.error('Error decoding token:', error);
    return 'viewer';
  }
};