import React from 'react';

const ResultCard = ({ pincode, area }) => {
  return (
    <div className="glass result-card">
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
