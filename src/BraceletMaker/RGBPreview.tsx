import React from "react";
import { RGBObj } from "./color.model";

interface RGBPreviewProps {
    color: RGBObj;
}

const RGBPreview: React.FC<RGBPreviewProps> = ({ color }) => {
    const redHeight = (color.red / 255) * 20;
    const greenHeight = (color.green / 255) * 20;
    const blueHeight = (color.blue / 255) * 20;

    return (
        <svg width={20} height={20} viewBox="0 0 20 20">
            <rect fill="rgb(255, 0, 0)" x={2} y={20 - redHeight} width={5} height={redHeight} />
            <rect fill="rgb(0, 255, 0)" x={8} y={20 - greenHeight} width={5} height={greenHeight} />
            <rect fill="rgb(0, 0, 255)" x={14} y={20 - blueHeight} width={5} height={blueHeight} />
        </svg>
    )
};

export default RGBPreview;
