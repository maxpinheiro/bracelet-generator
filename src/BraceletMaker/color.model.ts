
export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBObj = {
    red: number;
    green: number;
    blue: number;
}

export type Hex = string;

export type Color = RGB | Hex;

export type Pattern = {
    outside: Color;
    middle: Color;
    inside: Color;   
};

export const serializePattern = (pattern: Pattern): string => {
    return Object.values(pattern).join('/');
}

export const deserializePattern = (pattern: string): Pattern => {
    const values = pattern.split('/');
    if (values.length === 3) {
        return {
            outside: values[0],
            middle: values[1],
            inside: values[2],
        }
    } else {
        return {
            outside: '',
            middle: '',
            inside: '',
        }
    }
}

export const getRGB = (color: Color): RGBObj => {
    if (color.includes('rgb')) {
        const tupleStr = color.substring(4, color.length - 1);
        const vals = tupleStr.split(',');
        if (vals.length === 3) {
            return {
                red: Number(vals[0]),
                green: Number(vals[1]),
                blue: Number(vals[2]),
            };
        } else {
            return {
                red: 0,
                green: 0,
                blue: 0,
            };
        }
    } else if (color.includes('#')){
        const tupleStr = color.substring(1);
        const r = tupleStr.substring(0, 2);
        const g = tupleStr.substring(2, 4);
        const b = tupleStr.substring(4, 6);
        if (r && g && b) {
            return {
                red: parseInt(r, 16),
                green: parseInt(g, 16),
                blue: parseInt(b, 16),
            };
        } else {
            return {
                red: 0,
                green: 0,
                blue: 0,
            };
        }
    } else {
        return {
            red: 0,
            green: 0,
            blue: 0,
        };
    }
}