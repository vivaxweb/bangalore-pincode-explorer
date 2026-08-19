import React from 'react';

const ResultCard = ({ pincode, area, onClick, isActive }) => {
  return (
    <div 
      className={`glass-panel result-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="pincode-badge">
        {pincode}
      </div>
      <div className="area-name">
        {area}
      </div>
    </div>
  );
};

export default ResultCard;
