
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
