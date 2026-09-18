// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getUserChannelProfile } from "../api/auth.api";
// import { getAllVideos } from "../api/video.api";
// import { toggleSubscription } from "../api/subscription.api";
// import VideoCard from "../components/VideoCard";

// function Channel() {
//   const { username } = useParams();

//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [subscribersCount, setSubscribersCount] = useState(0);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchChannel = async () => {
//       try {
//         const response = await getUserChannelProfile(username);

//         console.log("CHANNEL RESPONSE:", response.data);

//         setChannel(response.data.data);

//         setIsSubscribed(response.data.data.isSubscribed);
//         setSubscribersCount(response.data.data.subscribersCount);

//         const videosResponse = await getAllVideos();

//         console.log("CHANNEL VIDEOS RESPONSE:", videosResponse.data);

//         const channelVideos = videosResponse.data.data.docs.filter(
//           (video) => video.ownerDetails._id === response.data.data._id,
//         );

//         setVideos(channelVideos);
//       } catch (error) {
//         console.log("CHANNEL ERROR:", error);
//         console.log("CHANNEL ERROR RESPONSE:", error.response?.data);

//         setError("Failed to load channel");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChannel();
//   }, [username]);

//   if (loading) {
//     return <p>Loading channel...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   const handleSubscribe = async () => {
//     try {
//       const response = await toggleSubscription(channel._id);

//       console.log("SUBSCRIBE RESPONSE:", response.data);

//       const subscribed = response.data.data.subscribed;

//       setIsSubscribed(subscribed);

//       setSubscribersCount((count) => (subscribed ? count + 1 : count - 1));
//     } catch (error) {
//       console.log("SUBSCRIBE ERROR:", error);
//       console.log("SUBSCRIBE ERROR RESPONSE:", error.response?.data);
//     }
//   };
//   return (
//     <div>
//       <img
//         src={channel.coverImage}
//         alt="Cover"
//         style={{
//           width: "100%",
//           height: "250px",
//           objectFit: "cover",
//         }}
//       />

//       <img
//         src={channel.avatar}
//         alt={channel.username}
//         style={{
//           width: "120px",
//           height: "120px",
//           borderRadius: "50%",
//           objectFit: "cover",
//         }}
//       />

//       <h1>{channel.fullName}</h1>

//       <p>@{channel.username}</p>

//       <p>{subscribersCount} subscribers</p>

//       <p>{channel.channelsSubscribedToCount} subscriptions</p>

//       <button onClick={handleSubscribe}>
//         {isSubscribed ? "Unsubscribe" : "Subscribe"}
//       </button>

//       <h2>Videos</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {videos.map((video) => (
//           <VideoCard key={video._id} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Channel;

// src/pages/Channel.jsx

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
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading channel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/20 p-5">
        <p className="text-red-400">{error}</p>
      </div>
    );
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
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= COVER IMAGE ================= */}
      <div className="relative h-48 overflow-hidden rounded-xl bg-gray-900 sm:h-64 md:h-72">
        <img
          src={channel.coverImage}
          alt="Cover"
          className="h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* ================= CHANNEL INFORMATION ================= */}
      <div className="relative px-4 sm:px-6">
        {/* Avatar */}
        <div className="-mt-14 h-28 w-28 overflow-hidden rounded-full border-4 border-black bg-gray-900 sm:-mt-16 sm:h-32 sm:w-32">
          <img
            src={channel.avatar}
            alt={channel.username}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Channel Details */}
        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {channel.fullName}
            </h1>

            <p className="mt-1 text-sm text-gray-400">@{channel.username}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>{subscribersCount} subscribers</span>

              <span className="text-gray-700">•</span>

              <span>{channel.channelsSubscribedToCount} subscriptions</span>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            className={`w-fit rounded-full px-6 py-3 text-sm font-semibold transition ${
              isSubscribed
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-[#39FF14] text-black hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)]"
            }`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* ================= CHANNEL NAVIGATION ================= */}
      <div className="mt-8 border-b border-gray-800">
        <div className="flex gap-8 px-4 sm:px-6">
          <button className="border-b-2 border-[#39FF14] px-1 pb-4 text-sm font-semibold text-[#39FF14]">
            Videos
          </button>

          <button className="px-1 pb-4 text-sm font-semibold text-gray-500 transition hover:text-white">
            About
          </button>
        </div>
      </div>

      {/* ================= VIDEOS ================= */}
      <section className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Videos</h2>

          <span className="text-sm text-gray-500">{videos.length} videos</span>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-xl bg-gray-900 py-16 text-center">
            <p className="text-gray-500">
              This channel hasn't uploaded any videos yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Channel;
