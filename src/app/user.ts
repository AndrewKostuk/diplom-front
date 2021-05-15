export class User {
    username: string;
    password: string;
}

export class UserDto {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    city: string;
    street: string;
    house: number;
    flat: number;
    birthDate: string;
    gender: string;
}

export class ServiceTicketDto {
    id: number;
    dateTime: string;
    name: string;
    roomNumber: string;
}

export class DoctorTicketDto {
    id: number;
    dateTime: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    speciality: string;
    roomNumber: string;
}