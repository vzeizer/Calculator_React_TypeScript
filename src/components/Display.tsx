import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="text-white text-right p-4 rounded-lg text-5xl font-light mb-4 overflow-hidden break-all">
      {value}
    </div>
  );
};

export default Display;