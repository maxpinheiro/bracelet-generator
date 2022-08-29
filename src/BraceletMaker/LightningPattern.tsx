import React from "react";
import { Color } from "./color.model";

interface LightningPatternProps {
    outside: Color;
    middle: Color;
    inside: Color;
}

const LightningPattern: React.FC<LightningPatternProps> = ({ outside, middle, inside }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.54 175" width={53.54 * 2} height={175 * 2}>
        <rect fill={outside} x="2.04" y="0.5" width="51" height="174"/>
        <polygon fill={middle} points="18.04 0.5 2.04 0.5 2.54 16 22.54 35 2.54 51 2.54 74 23.54 94 2.54 111 2.54 137 25.54 157 3.54 174 42.54 174 52.54 164 52.54 152 24.04 124.5 53.04 98.5 53.04 89.5 25.04 62.5 52.04 37.5 52.04 29.5 18.04 0.5"/>
        <polygon fill={inside} points="1.04 0.5 9.04 10.5 34.54 34 4.04 60.5 35.04 95.5 4.04 122.5 36.04 158.5 15.04 174.5 27.04 174.5 45.04 156.5 13.04 124.5 44.04 93.5 14.04 62.5 44.04 32.5 10.04 0.5 1.04 0.5"/>
    </svg>
);

export default LightningPattern;
