import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideoById } from "../api/video.api";
import { toggleVideoLike } from "../api/like.api";
import { toggleSubscription } from "../api/subscription.api";
import { getUserPlaylists, addVideoToPlaylist } from "../api/playlist.api";
import {
  getVideoComments,
  addComment,
  deleteComment,
  updateComment,
} from "../api/comment.api";
import { useAuth } from "../context/AuthContext";

function Watch() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const [video, setVideo] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideoById(videoId);

        console.log("VIDEO RESPONSE:", response.data);

        setVideo(response.data.data);
        setIsLiked(response.data.data.isLiked);
        setLikesCount(response.data.data.likesCount);
        setIsSubscribed(response.data.data.owner.isSubscribed);
        setSubscribersCount(response.data.data.owner.subscribersCount);

        if (user?._id) {
          const playlistsResponse = await getUserPlaylists(user._id);

          console.log("WATCH PLAYLISTS RESPONSE:", playlistsResponse.data);

          setPlaylists(playlistsResponse.data.data);
        }
      } catch (error) {
        console.log("VIDEO ERROR:", error);
        console.log("VIDEO ERROR RESPONSE:", error.response?.data);

        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getVideoComments(videoId);

        console.log("COMMENTS RESPONSE:", response.data);

        setComments(response.data.data.docs);
      } catch (error) {
        console.log("COMMENTS ERROR:", error);
        console.log("COMMENTS ERROR RESPONSE:", error.response?.data);

        setCommentsError("Failed to load comments");
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleLike = async () => {
    try {
      const response = await toggleVideoLike(videoId);

      console.log("LIKE RESPONSE:", response.data);

      const liked = response.data.data.isLiked;

      setIsLiked(liked);

      setLikesCount((count) => (liked ? count + 1 : count - 1));
    } catch (error) {
      console.log("LIKE ERROR:", error);
      console.log("LIKE ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await toggleSubscription(video.owner._id);

      console.log("SUBSCRIBE RESPONSE:", response.data);

      const subscribed = response.data.data.subscribed;

      setIsSubscribed(subscribed);

      setSubscribersCount((count) => (subscribed ? count + 1 : count - 1));
    } catch (error) {
      console.log("SUBSCRIBE ERROR:", error);
      console.log("SUBSCRIBE ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      const response = await addVideoToPlaylist(videoId, selectedPlaylist);

      console.log("ADD TO PLAYLIST RESPONSE:", response.data);

      setSelectedPlaylist("");
    } catch (error) {
      console.log("ADD TO PLAYLIST ERROR:", error);
      console.log("ADD TO PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const response = await addComment(videoId, {
        content: commentText,
      });

      console.log("ADD COMMENT RESPONSE:", response.data);

      const commentsResponse = await getVideoComments(videoId);

      console.log("COMMENTS AFTER ADD:", commentsResponse.data);

      setComments(commentsResponse.data.data.docs);

      setCommentText("");
    } catch (error) {
      console.log("ADD COMMENT ERROR:", error);
      console.log("ADD COMMENT ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.content);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const response = await updateComment(editingComment._id, {
        content: commentText,
      });

      console.log("UPDATE COMMENT RESPONSE:", response.data);

      const commentsResponse = await getVideoComments(videoId);

      console.log("COMMENTS AFTER UPDATE:", commentsResponse.data);

      setComments(commentsResponse.data.data.docs);

      setEditingComment(null);
      setCommentText("");
    } catch (error) {
      console.log("UPDATE COMMENT ERROR:", error);
      console.log("UPDATE COMMENT ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await deleteComment(commentId);

      console.log("DELETE COMMENT RESPONSE:", response.data);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.log("DELETE COMMENT ERROR:", error);
      console.log("DELETE COMMENT ERROR RESPONSE:", error.response?.data);
    }
  };

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <div>
      <video src={video.videoFile.url} controls width="800" />

      <h1>{video.title}</h1>

      <p>{video.description}</p>

      <p>{video.views} views</p>

      <p>
        By{" "}
        <Link to={`/channel/${video.owner.username}`}>
          {video.owner.username}
        </Link>
      </p>

      <p>{subscribersCount} subscribers</p>

      <button onClick={handleSubscribe}>
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>

      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>

      <p>{likesCount} likes</p>

      <div>
        <select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">Select Playlist</option>

          {playlists.map((playlist) => (
            <option key={playlist._id} value={playlist._id}>
              {playlist.name}
            </option>
          ))}
        </select>

        <button onClick={handleAddToPlaylist} disabled={!selectedPlaylist}>
          Add to Playlist
        </button>
      </div>

      <h2>Comments</h2>

      <form onSubmit={editingComment ? handleUpdateComment : handleAddComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit">
          {editingComment ? "Update Comment" : "Comment"}
        </button>

        {editingComment && (
          <button
            type="button"
            onClick={() => {
              setEditingComment(null);
              setCommentText("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {commentsLoading && <p>Loading comments...</p>}

      {commentsError && <p>{commentsError}</p>}

      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <strong>{comment.owner?.username}</strong>
            </p>

            <p>{comment.content}</p>

            {comment.owner?._id?.toString() === user?._id?.toString() && (
              <>
                <button onClick={() => handleEditComment(comment)}>Edit</button>

                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watch;
