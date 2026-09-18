// src/components/VideoCard.jsx

import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div className="group min-w-0">
      {/* Thumbnail */}
      <Link to={`/watch/${video._id}`}>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900">
          <img
            src={video.thumbnail.url}
            alt={video.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />

          {/* Duration */}
          <span className="absolute bottom-2 right-2 rounded bg-black/90 px-1.5 py-0.5 text-xs font-medium text-white">
            {video.duration} seconds
          </span>
        </div>
      </Link>

      {/* Video Information */}
      <div className="mt-3">
        {/* Title */}
        <Link to={`/watch/${video._id}`}>
          <h2 className="line-clamp-2 text-base font-semibold leading-6 text-white transition hover:text-[#39FF14]">
            {video.title}
          </h2>
        </Link>

        {/* Channel */}
        <p className="mt-2 text-sm text-gray-400 transition group-hover:text-gray-300">
          {video.ownerDetails?.username || video.owner?.username}
        </p>

        {/* Views */}
        <p className="mt-1 text-sm text-gray-500">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
