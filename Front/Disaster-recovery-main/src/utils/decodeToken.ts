export const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    return payload.role; // Return the role
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};