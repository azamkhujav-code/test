/**
 * Manual test cases for logger functionality
 * Run this file with: npx tsx src/utils/logger.test.ts
 * 
 * This demonstrates that:
 * 1. Email addresses are properly masked
 * 2. Passwords are completely redacted
 * 3. Sensitive keys are removed
 * 4. Logging captures all user actions
 */

import { logUserAction, getStoredLogs, clearLogs } from './logger';

console.log('=== Logger Security Test ===\n');

// Clear any existing logs
clearLogs();

// Test 1: Login with email masking
console.log('Test 1: Login action (email should be masked)');
logUserAction('User logged in', 'info', {
  email: 'testuser@example.com',
  password: 'supersecret123', // This should be redacted
  timestamp: new Date().toISOString(),
});

// Test 2: Logout action
console.log('\nTest 2: Logout action');
logUserAction('User logged out', 'info', {
  email: 'admin@company.com',
  timestamp: new Date().toISOString(),
});

// Test 3: Failed login attempt
console.log('\nTest 3: Failed login attempt');
logUserAction('Login attempt failed', 'warn', {
  reason: 'Invalid credentials',
  email: 'hacker@bad.com',
  password: 'tryingtohack', // Should be redacted
});

// Test 4: Session restoration
console.log('\nTest 4: Session restored');
logUserAction('Session restored', 'info', {
  email: 'returning.user@example.com',
  timestamp: new Date().toISOString(),
});

// Test 5: Verify sensitive data is redacted
console.log('\nTest 5: Verify sensitive keys are redacted');
logUserAction('API call made', 'info', {
  apiKey: 'sk_live_1234567890', // Should be redacted
  accessToken: 'bearer_xyz', // Should be redacted
  secret: 'my_secret_value', // Should be redacted
  email: 'user@test.com',
});

// Retrieve and display stored logs
console.log('\n=== Stored Logs Summary ===');
const logs = getStoredLogs();
console.log(`Total logs stored: ${logs.length}\n`);

logs.forEach((log, index) => {
  console.log(`Log ${index + 1}:`);
  console.log(`  Action: ${log.action}`);
  console.log(`  Level: ${log.level}`);
  console.log(`  Details: ${JSON.stringify(log.details, null, 2)}`);
  console.log('');
});

// Verification checklist
console.log('=== Verification Checklist ===');
console.log('Check the logs above and verify:');
console.log('1. All emails show pattern: first2chars***@domain.com');
console.log('2. All password fields show: [REDACTED]');
console.log('3. All apiKey/token/secret fields show: [REDACTED]');
console.log('4. Timestamps and non-sensitive data are preserved');
console.log('\nIf all checks pass, logging is secure!');

// Clean up
clearLogs();
