/**
 * Utility script to generate bcrypt hashes for test passwords
 * Run with: npx tsx scripts/generateHashes.ts
 */
import bcrypt from 'bcryptjs';

const testPasswords = [
  { email: 'demo@example.com', password: 'Demo123!' },
  { email: 'test@example.com', password: 'Test456!' },
  { email: 'admin@example.com', password: 'Admin789!' },
];

async function generateHashes() {
  console.log('Generating bcrypt hashes for test passwords...\n');

  for (const { email, password } of testPasswords) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${email} / ${password}`);
    console.log(`Hash: ${hash}\n`);
  }
}

generateHashes();
