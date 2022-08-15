/**
 * Created by yilmaz on 25.07.22.
 * Project: dashboard-app
 */

import React from 'react';

interface SkeletonLoadingProps {
  count?: number;
}

const SkeletonContent: React.FC<any> = () => {
  return (
    <div className="bg-light p-3 w-100 mb-3 mt-3">
      <div className="skeleton-item size-2 mb-5" />
      <div className="skeleton-item" />
      <div className="skeleton-item" />
      <div className="skeleton-item size-4" />
    </div>
  );
};
const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ count = 2 }) => {
  return (
    <>
      {Array.from({ length: count }, (v, i) => (
        <SkeletonContent key={`skeleton-${i}`} />
      ))}
    </>
  );
};

export default SkeletonLoading;
