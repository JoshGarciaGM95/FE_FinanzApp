export interface FeaturesData {
    RRHHH: featuredata[];
    Finance: featuredata[];
    // "Marketing": feature[];
    // "Sales": feature[];
    // "Operations": feature[];
    // "IT": feature[];
    // "Customer Service": feature[];
    // "Legal": feature[];
}

export interface featuredata {
    id: number;
    name: string;
    description: string;
    icon: string;
}