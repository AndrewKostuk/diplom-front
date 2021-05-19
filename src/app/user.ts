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

class PharmacyDto {
    name: string;
    dose: string;
    amountPerDay: number;
    food: String;
    courseDuration: number;
}

class ProcedureDto {
    id: number;
    name: string;
    amount: number;
}

export class VisitDto {
    id: number;
    doctorTicketDto: DoctorTicketDto;
    diagnoses: { id: number, name: string }[];
    analyses: { id: number, name: string }[];
    pharmacies: PharmacyDto[];
    procedures: ProcedureDto[];
}