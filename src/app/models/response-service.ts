export class ResponseService<T> {
    data: T[];
    message: string;
    status: number;
}

export class ResponseServiceSingle<T> {
    data: T;
    message: string;
    status: number;
}