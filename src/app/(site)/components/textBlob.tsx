import React from 'react';
import { blobPaths } from './blobpaths';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from 'sanity';

interface TextBlobProps {
  text: PortableTextBlock[];
  size?: number;
}

const TextBlob: React.FC<TextBlobProps> = ({ text, size = 500}) => {
  return (
    <div className={`relative w-64 h-64 flex justify-center moving-object`}>
      <svg viewBox={`0 0 ${size} ${size+100}`}  className=" absolute inset-0 z-0">
        <path d={blobPaths[2]} fill="#e82265" transform="translate(5 5) scale(1.2)" />
      </svg>
      <div className={`relative z-10 w-3/4 h-min text-sm text-white pt-12 font-semibold`}>
        <PortableText value={text} />
      </div>
    </div>
  );
};

export default TextBlob;
