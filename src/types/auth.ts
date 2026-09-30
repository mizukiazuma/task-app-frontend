export type User={
    id : number;
    username : string;
    email : string;
    password : string;
};
export type LoginResponse = {
    access : string;
    refresh : string;
};