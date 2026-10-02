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

export type Task = {
    id : number;
    title : string;
    description : string;
    status : string;
    due_date : string;
    created_at : Date;
    updated_at : Date;
}