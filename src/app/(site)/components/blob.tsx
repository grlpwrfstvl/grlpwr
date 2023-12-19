import React from 'react';

interface BlobProps {
  width?: number;
  height?: number;
}

const blobPaths = [
  'M332.3,48.8c32.6,18.1,58.5,49.4,64.7,83.7c6.3,34.3-7.1,71.5-15.8,107.1c-8.6,35.7-12.6,69.7-26,108.4c-13.5,38.6-36.5,81.9-68,86.9c-31.4,5-71.5-28.3-117.1-41.8c-45.7-13.6-97.1-7.5-123.9-28.3c-26.7-20.8-28.9-68.5-35-115.4c-6.2-46.8-16.4-92.6-8-138c8.3-45.3,35.3-90,74.7-105s91.3-0.3,136.9,9.6C260.4,25.8,299.7,30.6,332.3,48.8z',
  'M332.3,48.8c28.5,20.1,62.5,61.4,72.1,100.7c9.6,39.3-4.5,78.4-15.8,114c-11.4,35.6-21.4,68-37.8,106.7c-16.4,38.6-41.5,76.9-73,81.9c-31.4,5-69.5-14.6-115.1-28.1c-45.7-13.6-89.1-6.6-115.9-27.4c-26.7-20.8-32.9-60.5-39-107.4c-6.2-46.8-14.4-93.6-6-139c8.3-45.3,35.3-90,74.7-105s84.4,3.3,130,13.2C270.3,25.8,313.7,33.7,332.3,48.8z',
  'M332.3,48.8c26.6,19.8,52.5,41.9,61.8,80.3c9.3,38.5,1.8,83.3-9.4,118.9c-11.1,35.6-25.8,62.2-40.8,100.9c-15,38.6-30.3,76.9-61.8,81.9c-31.4,5-70.5-20.6-116.1-34.1c-45.7-13.6-90.1-13.3-116.9-34.1c-26.7-20.8-33.6-57.9-39.7-104.8c-6.2-46.8-12.8-93.6-4.4-139c8.3-45.3,35.3-80,74.7-95s95.1,9.3,140.7,19.2C279.3,25.8,312.3,29,332.3,48.8z',
  'M332.3,48.8c30.2,15.9,55.5,32.4,69.8,66.7c14.3,34.3,12.3,77.5,1,113.1c-11.3,35.7-27.6,63.2-41,101.9c-13.5,38.6-25,75.9-56.5,80.9c-31.4,5-74.5-22.3-120.1-35.8c-45.7-13.6-94.1-1.7-120.9-22.5c-26.7-20.8-38.3-59.1-44.4-106c-6.2-46.8,2.5-88.6,10.9-134c8.3-45.3,32.3-84,71.7-99s106.8-6.3,152.4,3.6C284.3,25.8,302.1,32.9,332.3,48.8z',
];

const Blob: React.FC<BlobProps> = ({ width = 400, height = 400 }) => {
    const randomBlobPath = blobPaths[Math.floor(Math.random() * blobPaths.length)];
  
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute top-0 left-0 z-10" fill="#fff">
        <clipPath id="blob-clip">
          <path d={randomBlobPath} transform="translate(15 10) scale(0.6)" />
        </clipPath>
        <rect x="0" y="0" width={width} height={height} fill="#0074d9" clipPath="url(#blob-clip)" />
      </svg>
    );
  };
  
  export default Blob;