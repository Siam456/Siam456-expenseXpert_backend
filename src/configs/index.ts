export const envVarse = {
    nodeEnv: process.env.NODE_ENV ?? '',
    port: Number(process.env.PORT) ?? 0,
    MONGO_URI: process.env.MONGO_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    DOMAIN: process.env.DOMAIN,
    cookieProps: {
        key: 'ExpressGeneratorTs',
        secret: process.env.COOKIE_SECRET ?? '',
        options: {
            httpOnly: true,
            signed: true,
            path: process.env.COOKIE_PATH ?? '',
            maxAge: Number(process.env.COOKIE_EXP ?? 0),
            domain: process.env.COOKIE_DOMAIN ?? '',
            secure: process.env.SECURE_COOKIE === 'true',
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? '',
        exp: process.env.COOKIE_EXP ?? '', // exp at the same time as the cookie
    },
    HOSTNAME: 'localhost',
    PROTOCOL: 'http',
};

export const APP_ORIGIN = `${envVarse.PROTOCOL}://${envVarse.HOSTNAME}:${envVarse.port}`;

export const MONGO_URI = process.env.MONGO_URI;

export const IN_PROD = envVarse.nodeEnv === 'production';

export const ONE_MINUTE = 60;

export const ONE_HOUR = 60 * ONE_MINUTE;

export const SALT_ROUND = 10;

export const ONE_BYTE = 1;

export const ONE_KB = 1024 * ONE_BYTE;

export const ONE_MB = 1024 * ONE_KB;
