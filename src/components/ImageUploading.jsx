const ImageUploading = (props) => {
  const ShowImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      props.UploadImageHandler(file);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-2xl mx-auto">
      <label
        htmlFor="fileInput"
        className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-10 text-center hover:border-blue-500 transition-all"
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={ShowImageHandler}
        />

        <span className="text-sm md:text-lg font-medium text-gray-600">
          Click or drag to upload your image
        </span>
      </label>
    </div>
  );
};

export default ImageUploading;
