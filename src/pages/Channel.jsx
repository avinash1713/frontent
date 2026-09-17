import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserChannelProfile } from "../api/auth.api";
import { getAllVideos } from "../api/video.api";
import { toggleSubscription } from "../api/subscription.api";
import VideoCard from "../components/VideoCard";

function Channel() {
  const { username } = useParams();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await getUserChannelProfile(username);

        console.log("CHANNEL RESPONSE:", response.data);

        setChannel(response.data.data);

        setIsSubscribed(response.data.data.isSubscribed);
        setSubscribersCount(response.data.data.subscribersCount);

        const videosResponse = await getAllVideos();

        console.log("CHANNEL VIDEOS RESPONSE:", videosResponse.data);

        const channelVideos = videosResponse.data.data.docs.filter(
          (video) => video.ownerDetails._id === response.data.data._id,
        );

        setVideos(channelVideos);
      } catch (error) {
        console.log("CHANNEL ERROR:", error);
        console.log("CHANNEL ERROR RESPONSE:", error.response?.data);

        setError("Failed to load channel");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [username]);

  if (loading) {
    return <p>Loading channel...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSubscribe = async () => {
    try {
      const response = await toggleSubscription(channel._id);

      console.log("SUBSCRIBE RESPONSE:", response.data);

      const subscribed = response.data.data.subscribed;

      setIsSubscribed(subscribed);

      setSubscribersCount((count) => (subscribed ? count + 1 : count - 1));
    } catch (error) {
      console.log("SUBSCRIBE ERROR:", error);
      console.log("SUBSCRIBE ERROR RESPONSE:", error.response?.data);
    }
  };
  return (
    <div>
      <img
        src={channel.coverImage}
        alt="Cover"
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
      />

      <img
        src={channel.avatar}
        alt={channel.username}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <h1>{channel.fullName}</h1>

      <p>@{channel.username}</p>

      <p>{subscribersCount} subscribers</p>

      <p>{channel.channelsSubscribedToCount} subscriptions</p>

      <button onClick={handleSubscribe}>
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>

      <h2>Videos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Channel;
