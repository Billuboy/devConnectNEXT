export default function generateUsername() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const str = Array(16)
    .fill('0')
    .reduce(
      (acc) => acc + chars.charAt(Math.floor(Math.random() * chars.length)),
      ''
    );
  return str;
}
