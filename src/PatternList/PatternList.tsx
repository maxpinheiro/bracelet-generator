import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deserializePattern, Pattern, serializePattern } from '../BraceletMaker/color.model';
import LightningPreview from '../BraceletMaker/LightningPreview';
import TrashIcon from '../icons/TrashIcon';
import PencilIcon from '../icons/PencilIcon';
import "./PatternList.css";
import PlusIcon from '../icons/PlusIcon';

const PatternList = () => {
  const [ patterns, setPatterns ] = useState<Pattern[]>([]);
  
  useEffect(() => {
    const currentPatterns: any[] = JSON.parse(window.localStorage.getItem("patterns") || "[]");
    const parsedPatterns: Pattern[] = currentPatterns.map(p => deserializePattern(p));
    setPatterns(parsedPatterns);
  }, []);

  const deletePattern = (idx: number) => {
    if (idx < patterns.length) {
      const filteredPatterns = patterns.filter((p, id) => id !== idx);
      window.localStorage.setItem("patterns", JSON.stringify(filteredPatterns.map(p => serializePattern(p))));
      console.log(filteredPatterns);
      setPatterns([...filteredPatterns]);
    }
  };

  return (
    <div className='pattern-list-page'>
      <div className="title-icon">
          <p className="title">your patterns</p>
          <Link to="/new" className="new-pattern-button"><PlusIcon /></Link>
      </div>
      <div className='pattern-list'>
        {
          patterns.map((pattern, idx) => (
            <div key={idx} className="pattern-preview">
              <LightningPreview outside={pattern.outside} middle={pattern.middle} inside={pattern.inside} />
              <Link to={`/edit/${pattern.outside.substring(1)}-${pattern.middle.substring(1)}-${pattern.inside.substring(1)}`} className="edit-pattern-button"><PencilIcon /></Link>
              <div onClick={() => deletePattern(idx)} className="delete-button"><TrashIcon /></div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default PatternList;
