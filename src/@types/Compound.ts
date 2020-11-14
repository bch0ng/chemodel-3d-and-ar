export interface Coordinates {
    x: number;
    y: number;
    z: number;
}

export interface Aids {
    from: number;
    to: number;
}

export interface CompoundData {
    coords: Coordinates[];
    aids: Aids[];
    numOfBonds: number[];
    elements: any;
    has3DModel: boolean;
}

export interface FormulaAndWeight {
    formula: string;
    weight: number;
}

export interface CompoundInfo {
    cid: number;
    name?: string;
    imageURL?: string;
    formula?: string;
    weight?: number;
    data?: CompoundData;
}
