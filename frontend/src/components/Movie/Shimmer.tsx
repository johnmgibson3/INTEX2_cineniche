import React from 'react';
import '../../css/Shimmer.css';

interface ShimmerProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = '150px',
  borderRadius = '5px',
}) => {
  return (
    <div className="shimmer-wrapper" style={{ width, height, borderRadius }}>
      <div className="shimmer" />
    </div>
  );
};

export default Shimmer;
