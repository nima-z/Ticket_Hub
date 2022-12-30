import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
//============================================================================

const scryptAsync = promisify(scrypt);

export async function passwordHasher(password: string) {
  const salt = randomBytes(8).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePassword(
  storedPassword: string,
  givenPassword: string
) {
  const [hashedPassword, salt] = storedPassword.split(".");
  const buf = (await scryptAsync(givenPassword, salt, 64)) as Buffer;

  return buf.toString("hex") === hashedPassword;
}
