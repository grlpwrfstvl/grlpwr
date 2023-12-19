import React from 'react';
import { blobPaths } from './blobpaths';
import { PortableText} from "@portabletext/react";
import { News } from '../../../../types/News';

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {

  return (
    <div key={news._id} className="relative w-64 flex items-center justify-center transition-transform transform hover:-translate-y-2">
    <svg viewBox="0 0 500 500" width="400" height="400" className="absolute inset-0 z-0">
      <path d={blobPaths[3]}
        fill="#e82265"
      />
    </svg>
    <div className="relative z-10 text-white font-semibold">
      <PortableText value={news.description} />
    </div>
  </div>
  );
};

export default NewsCard;
