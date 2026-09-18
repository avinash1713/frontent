import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSubscribedChannels } from "../api/subscription.api";

function Subscriptions() {
  const { user } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getSubscribedChannels(user._id);

        console.log("SUBSCRIPTIONS RESPONSE:", response.data);
        console.log("SUBSCRIPTIONS DATA:", response.data.data);

        setSubscriptions(response.data.data);
      } catch (error) {
        console.log("SUBSCRIPTIONS ERROR:", error);
        console.log("SUBSCRIPTIONS ERROR RESPONSE:", error.response?.data);

        setError("Failed to load subscriptions");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchSubscriptions();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading subscriptions...</p>
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

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Subscriptions</h1>

        <p className="mt-2 text-sm text-gray-500">
          Channels you're subscribed to.
        </p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= COUNT ================= */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">Your Subscriptions</h2>

        <span className="text-sm text-gray-500">
          {subscriptions.length}{" "}
          {subscriptions.length === 1 ? "channel" : "channels"}
        </span>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {subscriptions.length === 0 ? (
        <div className="rounded-xl bg-gray-900 px-4 py-16 text-center">
          <p className="text-gray-500">
            You haven't subscribed to any channels yet.
          </p>
        </div>
      ) : (
        /* ================= SUBSCRIPTIONS ================= */
        <div className="space-y-5">
          {subscriptions.map((item) => {
            const channel = item.subscribedChannel;
            const latestVideo = channel.latestVideo;

            return (
              <div
                key={channel._id}
                className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition hover:border-green-900"
              >
                <div className="flex flex-col gap-5 p-5 md:flex-row">
                  {/* Channel */}
                  <Link
                    to={`/channel/${channel.username}`}
                    className="flex shrink-0 items-center gap-4 md:w-64"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gray-800 bg-gray-900">
                      {channel.avatar?.url ? (
                        <img
                          src={channel.avatar.url}
                          alt={channel.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-[#39FF14]">
                          {channel.username?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-white transition hover:text-[#39FF14]">
                        {channel.fullName}
                      </h3>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        @{channel.username}
                      </p>
                    </div>
                  </Link>

                  {/* Latest Video */}
                  {latestVideo ? (
                    <Link
                      to={`/watch/${latestVideo._id}`}
                      className="group flex min-w-0 flex-1 flex-col gap-4 sm:flex-row"
                    >
                      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gray-900 sm:w-56">
                        <img
                          src={latestVideo.thumbnail?.url}
                          alt={latestVideo.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-[#39FF14]">
                          Latest Video
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-white transition group-hover:text-[#39FF14]">
                          {latestVideo.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                          {latestVideo.description}
                        </p>

                        <p className="mt-3 text-sm text-gray-500">
                          {latestVideo.views} views
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-1 items-center">
                      <p className="text-sm text-gray-500">
                        This channel hasn't uploaded any videos yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
