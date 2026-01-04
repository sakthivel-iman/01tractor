
export type TractorTelemetry = {
    id: string;
    timestamp: string; // ISO 8601 format
    speedKmph: number;
    wheelSlipRearRh: number;
    wheelSlipRearLh: number;
    workingHours: number;
    latitude: number;
    longitude: number;
};

export type UserProfile = {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    profileImageUrl: string;
};

export type Tractor = {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    engineNo: string;
    chassisNo: string;
    yearOfRegistration: number;
};
