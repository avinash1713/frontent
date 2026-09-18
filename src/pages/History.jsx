import { useEffect, useState } from "react";
import { getWatchHistory } from "../api/auth.api";
import VideoCard from "../components/VideoCard";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getWatchHistory();

        console.log("WATCH HISTORY RESPONSE:", response.data);

        setHistory(response.data.data);
      } catch (error) {
        console.log("WATCH HISTORY ERROR:", error);
        console.log("WATCH HISTORY ERROR RESPONSE:", error.response?.data);

        setError("Failed to load watch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading watch history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Watch History</h1>

      <p>{history.length} videos in history</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {history.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default History;
