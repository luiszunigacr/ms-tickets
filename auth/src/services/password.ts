import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    console.log('toHash password:', password);
    const salt = randomBytes(8).toString('hex');
    console.log('salt:', salt);
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    console.log('buf:', buf);

    console.log('hashed:', buf.toString('hex'));

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    const hashedSuppliedPassword = buf.toString('hex');
    console.log('hashedSuppliedPassword:', hashedSuppliedPassword);

    return hashedPassword === hashedSuppliedPassword;
  }
}
