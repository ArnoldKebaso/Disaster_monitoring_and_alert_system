export const generatePassword = (shortcode, passkey, timestamp) => {
    return Buffer.from(shortcode + passkey + timestamp).toString('base64');
};