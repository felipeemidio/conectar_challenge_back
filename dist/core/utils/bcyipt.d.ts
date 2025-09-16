export declare function encodePassword(rawPassword: string): Promise<string>;
export declare function comparePassword(rawPassword: string, hashPassword: string): Promise<boolean>;
