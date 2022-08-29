import React from "react";
import { Color } from "./color.model";

interface LightningPreviewProps {
    outside: Color;
    middle: Color;
    inside: Color;
}

const LightningPreview: React.FC<LightningPreviewProps> = ({ outside, middle, inside }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.03 81.67" width={51.03} height={81.67}>
        <rect fill={outside} x="0.03" width="53.39" height="81.67"/>
        <polygon fill={middle} stroke="#9995" strokeWidth={0.5} points="0.08 81.58 53.49 44.2 53.43 37.32 0.04 0 0.04 6 0.02 24.89 23.43 42.15 0.01 56.79 0.04 66.75 0.08 81.58"/>
        <polygon fill={inside} stroke="#9995" strokeWidth={0.5} points="0 73.61 45.42 41.45 0.04 9 0.04 10.53 0.06 16.5 35.12 41.98 0 66.06 0 73.61"/>
    </svg>
);

export default LightningPreview;
