export interface DataStoredInToken {
    _id: string;
}

export interface Token {
    token: string;
    expiresIn: number;
}
