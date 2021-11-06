import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [filePath, setFilePath] = useState("");

  const handleChange = (e) => {
    let value = e.target.files[0];
    //console.log(value);
    setFile(value);
  };
  const postData = async (e) => {
    e.preventDefault();
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    await axios
      .post("https://fileupload-node.herokuapp.com/single", data)
      .then((res) => {
        console.log("Response: ", res);
        setFilePath(res.data.data.photo);
      })
      .catch((err) => console.log("Error: ", err.message));
  };

  const handleMultipleChange = (e) => {
    let value = e.target.files;
    setFiles(value);
  };

  const postMultipleData = async (e) => {
    e.preventDefault();
    console.log(files);
    const data = new FormData();
    for (let x = 0; x < files.length; x++) {
      data.append("mFile", files[x]);
    }
    await axios
      .post("http://localhost:8000/multiple", data)
      .then((res) => {
        console.log("Response: ", res);
      })
      .catch((err) => console.log("Error: ", err.message));
  };

  return (
    <div className="create">
      <h2>File Upload</h2>
      <form method="POST">
        <label>Single file upload 🗄️ </label>
        <input
          type="file"
          name="file"
          accept="image/*, application/pdf"
          onChange={handleChange}
        />
        <button type="submit" onClick={postData}>
          Submit
        </button>
        <img
          style={{ width: "100px", height: "100px", borderRadius: "100%" }}
          src={filePath}
          alt=""
        />
      </form>
      <form method="POST">
        <label>Multiple file upload 🗃️</label>
        <input
          type="file"
          name="mFile"
          multiple
          accept="image/*, application/pdf"
          onChange={handleMultipleChange}
        />
        <button type="submit" onClick={postMultipleData}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
