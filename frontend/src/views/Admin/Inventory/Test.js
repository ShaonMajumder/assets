import React, { useState } from 'react';

import ImageGalleryUploader from "../../../components/ImageGalleryUploader/ImageGalleryUploader";



const Test = () => {

  const [imageViewerArray, setImageViewerArray] = useState([]);
  const [imageFormdataArray, setImageFormdataArray] = useState([]);

  const uploadMultipleFiles = (files) => {
    setImageFormdataArray(([...prevImageFormdataArray]) => [...prevImageFormdataArray, ...files] );
    
    setImageViewerArray(([...prevImageViewerArray]) => [
      ...prevImageViewerArray,
      ...Array.from(files, (file) => URL.createObjectURL(file))
    ]);
  };

  

  const handleRemoveImage = (id) => {
    setImageViewerArray(([...prevImageViewerArray]) => prevImageViewerArray.filter((_, i) => i !== id) );
    setImageFormdataArray(([...prevImageFormdataArray]) => prevImageFormdataArray.filter((_, i) => i !== id) );
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
