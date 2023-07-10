import React, { useState } from 'react';

import ImageGalleryUploader from "../../../components/ImageGalleryUploader/ImageGalleryUploader";



const Test = () => {

  const [imageViewerArray, setImageViewerArray] = useState([]);
  const [imageFormdataArray, setImageFormdataArray] = useState([]);

  const uploadMultipleFiles = (files) => {
    let fileObj = [];
    setImageFormdataArray([...imageFormdataArray, ...files]);
    for (let i = 0; i < files.length; i++) {
      fileObj.push(URL.createObjectURL(files[i]));
    }
    setImageViewerArray([...imageViewerArray, ...fileObj]);
  };

  const handleRemoveImage = (id) => {
    let objA = imageViewerArray.filter((img, i) => i !== id);
    let objB = imageFormdataArray.filter((imgs, idx) => idx !== id);
    setImageViewerArray(objA);
    setImageFormdataArray(objB);
  };

  

  return (
    <ImageGalleryUploader
      isImageUploader={true}
      validation={{
        maxFileSize: 3,
        maxFileCount: 10,
      }}
      imageArray={imageViewerArray}
      handleImage={uploadMultipleFiles}
      handleRemoveImage={handleRemoveImage}
    />
    
  );
};

export default Test;
