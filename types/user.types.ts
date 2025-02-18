import { Image } from "./web.types";

interface PROFILE {
    bio?: string;
    image: {
        url: string;
        fileId: string;
    };
    role: ROLE;
}

export interface USER {
    id?: string;
    email?: string;
    username?: string;
    provider?: PROVIDER;
    profile?: PROFILE;
    emailVerified?: Date;
    updatedAt?: Date;
    createdAt?: Date;
}

enum PROVIDER {
    GOOGLE = 'google',
    GITHUB = 'github',
    CREDENTIAL = 'credentials',
}

enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER',
    TEACHER = 'TEACHER',
}

    export type UPDATE_USER = {
        username?: string;
        bio?: string;
        image: Image;
        email: string;
    };


