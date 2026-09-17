import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div>
      <Link to={`/watch/${video._id}`}>
        <img
          src={video.thumbnail.url}
          alt={video.title}
          style={{
            width: "300px",
            height: "170px",
            objectFit: "cover",
          }}
        />
      </Link>

      <h2>{video.title}</h2>

      <p>By {video.ownerDetails.username}</p>

      <p>{video.views} views</p>

      <p>{video.duration} seconds</p>
    </div>
  );
};

export default VideoCard;
