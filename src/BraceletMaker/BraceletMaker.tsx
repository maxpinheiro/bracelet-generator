import React, { useEffect, useState } from "react";
import { Color, deserializePattern, getRGB, Hex, Pattern, serializePattern } from "./color.model";
import LightningPattern from "./LightningPattern";
import "./BraceletMaker.css";
import { ChromePicker } from "react-color";
import RGBPreview from "./RGBPreview";
import { useNavigate, useParams } from "react-router";
import LeftArrow from "../icons/LeftArrow";

const BraceletMaker: React.FC<{ newPattern: boolean }> = ({ newPattern }) => {
    const [ outsideColor, setOutsideColor ] = useState<Hex>('#a84232');
    const [ middleColor, setMiddleColor ] = useState<Hex>('#cc9337');
    const [ insideColor, setInsideColor ] = useState<Hex>('#58ad4b');
    const [ editing, setEditing ] = useState<"outside" | "middle" | "inside" | null>(null);
    const [ saveStatus, setSaveStatus ] = useState<"normal" | "loading" | "success">("normal");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const outside = params.outside;
        const middle = params.middle;
        const inside = params.inside;

        if (outside && middle && inside) {
            setOutsideColor('#'+outside);
            setMiddleColor('#'+middle);
            setInsideColor('#'+inside);
        }
    }, [ params ]);

    const savePattern = () => {
        const currentPatterns: any[] = JSON.parse(window.localStorage.getItem("patterns") || "[]");
        const parsedPatterns: Pattern[] = currentPatterns.map(p => deserializePattern(p));
        const newPattern: Pattern = {
            outside: outsideColor,
            middle: middleColor,
            inside: insideColor
        };
        let patterns: Pattern[] = [];
        // update existing pattern ( /edit/pattern )
        if (params.outside && params.middle && params.inside) {
            const matchesUrlPattern = (pattern: Pattern): boolean => 
                pattern.outside === "#"+params.outside &&
                pattern.middle === "#"+params.middle &&
                pattern.inside === "#"+params.inside;
            patterns = parsedPatterns.map(p => matchesUrlPattern(p) ? newPattern : p);
        } else { // create new pattern
            patterns = [...parsedPatterns, newPattern];
        }
        
        setSaveStatus("loading");
        setTimeout(() => {
            window.localStorage.setItem("patterns", JSON.stringify(patterns.map(p => serializePattern(p))));
            setSaveStatus("success");
            setTimeout(() => navigate("/"), 1000);
            setTimeout(() => setSaveStatus("normal"), 3000);

            if (params.outside) {
                navigate(`/edit/${newPattern.outside.substring(1)}-${newPattern.middle.substring(1)}-${newPattern.inside.substring(1)}`)
            }
        }, 3000);
    }

    return (
        <div className="bracelet-maker-container">
            <div className="title-icon">
                <div className="icon" onClick={() => navigate(-1)}><LeftArrow /></div>
                <p className="header">{newPattern ? "Create a New " : "Edit Your "} Pattern</p>
            </div>
            <div className="body">
                <div className="bracelet-preview">
                    <LightningPattern outside={outsideColor} middle={middleColor} inside={insideColor} />
                </div>
                <div className="color-editor">
                    <div className="color-picker-row">
                        <p>outside:</p>
                        <p className="color">{String(outsideColor).toUpperCase()}</p>
                        <p className="edit-button" onClick={() => setEditing(e => e === "outside" ? null : "outside")}>
                            {editing === "outside" ? "Save" : <RGBPreview color={getRGB(outsideColor)} />}
                        </p>
                        {
                            editing === "outside" &&
                            <ChromePicker color={outsideColor} onChange={(color) => setOutsideColor(color.hex)} />
                        }
                    </div>
                    <div className="color-picker-row">
                        <p>middle:</p>
                        <p className="color">{String(middleColor).toUpperCase()}</p>
                        <p className="edit-button" onClick={() => setEditing(e => e === "middle" ? null : "middle")}>
                            {editing === "middle" ? "Save" : <RGBPreview color={getRGB(middleColor)} />}
                        </p>
                        {
                            editing === "middle" &&
                            <ChromePicker color={middleColor} onChange={(color) => setMiddleColor(color.hex)} />
                        }
                    </div>
                    <div className="color-picker-row">
                        <p>inside:</p>
                        <p className="color">{String(insideColor).toUpperCase()}</p>
                        <p className="edit-button" onClick={() => setEditing(e => e === "inside" ? null : "inside")}>
                            {editing === "inside" ? "Save" : <RGBPreview color={getRGB(insideColor)} />}
                        </p>
                        {
                            editing === "inside" &&
                            <ChromePicker color={insideColor} onChange={(color) => setInsideColor(color.hex)} />
                        }
                    </div>
                </div>
            </div>
            <div>
                <p className={`save-button ${saveStatus !== "normal" && "disabled"}`} onClick={savePattern}>
                    {saveStatus === "loading" ? "Saving..." : saveStatus === "success" ? "Successfully saved pattern!" : "Save Pattern"}</p>
            </div>
        </div>
    )
}

export default BraceletMaker;
