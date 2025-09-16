import * as bcrypt from 'bcrypt'

export async function encodePassword(rawPassword: string): Promise<string> {
    const SALT = await bcrypt.genSalt();
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashPassword);

}