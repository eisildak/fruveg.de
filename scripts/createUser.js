import Crypto from 'crypto';

// Basit password hash (Wasp Argon2 kullanıyor ama test için MD5)
const password = '123456789';
const hash = Crypto.createHash('md5').update(password).digest('hex');

console.log('Password:', password);
console.log('Hash:', hash);

// SQL komutları
console.log('\n--- SQL Commands ---\n');

const userEmail = 'erolisildakk@gmail.com';
const userId = 1;

console.log(`
-- 1. Önce mevcut kullanıcıyı sil
DELETE FROM "AuthIdentity" WHERE "providerUserId" = '${userEmail}';
DELETE FROM "Session" WHERE "userId" IN (SELECT id FROM "Auth" WHERE "userId" = ${userId});
DELETE FROM "Auth" WHERE "userId" = ${userId};
DELETE FROM "User" WHERE email = '${userEmail}';

-- 2. User oluştur
INSERT INTO "User" (id, email, "isEmailVerified", "isAdmin", "createdAt")
VALUES (${userId}, '${userEmail}', true, false, NOW());

-- 3. Auth oluştur
INSERT INTO "Auth" (id, "userId")
VALUES ('${Crypto.randomUUID()}', ${userId});

-- 4. AuthIdentity oluştur (şifre hash'li)
-- Not: Gerçek Argon2 hash gerekir, bu sadece placeholder
INSERT INTO "AuthIdentity" ("providerName", "providerUserId", "providerData", "authId")
VALUES (
  'email',
  '${userEmail}',
  '{"hashedPassword":"$argon2id$v=19$m=19456,t=2,p=1$placeholder","isEmailVerified":true}',
  (SELECT id FROM "Auth" WHERE "userId" = ${userId})
);
`);
