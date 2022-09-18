export default function validateInput(hash) {
  const regex = new RegExp('^[0-9a-fA-F]{64}$');
  if (!regex.test(hash)) {
    throw new Error('Hash must be a 64 character hexadecimal string');
  }
}