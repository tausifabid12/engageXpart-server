interface IDoctor {
    name: string;
    specialization?: string;
}

interface IDepartment {
    name: string;
    description?: string;
    doctors: IDoctor[];
}

interface IBranch {
    name: string;
    location?: string;
    departments: IDepartment[];
}

export interface IMedcalBusiness {
    name: string;
    email: string;
    vendorId: string;
    userId: string;
    userName: string
    businessType: 'hospital' | 'diagonostic-center' | 'doctor-chamber' | 'dental-hospital'
    catalogId: string
    description?: string;
    services: string[];
    branches: IBranch[];
}