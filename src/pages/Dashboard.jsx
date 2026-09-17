import { useState } from "react";
import { publishVideo } from "../api/video.api";
import { togglePublishStatus } from "../api/video.api";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  const handlePublish = async () => {
    try {
      const response = await togglePublishStatus("6aab74135a4469a618296136");

      console.log("TOGGLE PUBLISH RESPONSE:", response.data);
    } catch (error) {
      console.log("TOGGLE PUBLISH ERROR:", error);
      console.log("TOGGLE PUBLISH RESPONSE:", error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("videoFile", formData.videoFile);
      data.append("thumbnail", formData.thumbnail);

      const response = await publishVideo(data);

      console.log("PUBLISH VIDEO RESPONSE:", response.data);

      alert("Video published successfully");

      setFormData({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
      });
    } catch (error) {
      console.log("PUBLISH VIDEO ERROR:", error);
      console.log("PUBLISH VIDEO RESPONSE:", error.response?.data);
    }
  };

  return (
    <div>
      <h1>Publish Video</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Video</label>
          <input
            type="file"
            name="videoFile"
            accept="video/*"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Publish Video</button>
        <button onClick={handlePublish}>Toggle Publish Status</button>
      </form>
    </div>
  );
}

export default Dashboard;
