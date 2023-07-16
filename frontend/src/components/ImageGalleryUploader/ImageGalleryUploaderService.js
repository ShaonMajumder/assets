const base64ToUint8Array = (string) => { 
  var raw = atob(string); 
  var rawLength = raw.length; 
  var buffer = new ArrayBuffer(rawLength);
  var array = new Uint8Array(buffer); 
  for (var i = 0; i < rawLength; i += 1) { 
    array[i] = raw.charCodeAt(i); 
  } 
  return array; 
}

export const convertImageUrl = async (imageUrl,headers=null) => {
  let response;
  if (headers == null){
    response = await fetch(imageUrl);
  } else{
    response = await fetch(imageUrl,  headers);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  return objectUrl;
}

export const convertImageUrlToFile = async (imageUrl,headers=null) => {
  try {
    let response;
    if (headers == null){
      response = await fetch(imageUrl);
    } else{
      response = await fetch(imageUrl, headers);
    }

    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error converting image URL to file:', error);
    return null;
  }
};
  

export const fetchDBImages = async ({
  images,
  images_url,
  imageViewerArray,
  setImageViewerArray,
  headers = null
}) => {
  let fileObj = [];
  
  for (let index = 0; index < images.length; index++) {
    const element = images[index];
    const url = `${images_url}${element.file_path}`;
    const imageUrl = await convertImageUrl(url, headers);

    fileObj.push(imageUrl);
  }

  setImageViewerArray([...imageViewerArray, ...fileObj]);
};



export const fetchEditDBImages = async ({
  images,
  images_url,
  imageViewerArray,
  setImageViewerArray,
  imageFormdataArray,
  setImageFormdataArray,
  headers = null
}) => { 
  let  fileObjView = [];
  let  fileObjFD = [];

  for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const url = `${images_url}${element.file_path}`;
      const imageUrl = await convertImageUrl(url,headers);
      fileObjView.push(imageUrl);
      const file = await convertImageUrlToFile(url,headers);
      fileObjFD.push(file);
  }

  setImageViewerArray([]);
  setImageFormdataArray([]);
  setImageViewerArray([...imageViewerArray, ...fileObjView ]);
  setImageFormdataArray([...imageFormdataArray, ...fileObjFD]);

  return imageFormdataArray;
}

export const fetchEditDBImages2D = async ({
  images2D,
  images_url,
  imageViewerArray2D,
  setImageViewerArray2D,
  imageFormdataArray2D,
  setImageFormdataArray2D,
  headers = null
}) => {  
  // console.log(images2D)
  let  fileObjView = [];
  let  fileObjFD = [];

  for (let row = 0; row < images2D.length; row++) {
    fileObjView.push([]);
    fileObjFD.push([]);
    let images = images2D[row];
    for (let col = 0; col < images.length; col++) {
      const element = images[col];
      const url = `${images_url}${element.file_path}`;
      const imageUrl = await convertImageUrl(url,headers);
  
      fileObjView[row].push(imageUrl);
      const file = await convertImageUrlToFile(url,headers);
      fileObjFD[row].push(file);
    }
  }

  setImageViewerArray2D([...imageViewerArray2D, ...fileObjView ]);
  setImageFormdataArray2D([...imageFormdataArray2D, ...fileObjFD]);
}

export const fetchDBImages2D = async ({
  images2D,
  images_url,
  imageViewerArray2D,
  setImageViewerArray2D,
  headers = null
}) => {
  let fileObj = [];
  for (let row = 0; row < images2D.length; row++) {
    fileObj.push([]);
    
    for (let col = 0; col < images2D[row].length; col++) {
      let element = images2D[row][col];
      let url = `${images_url}${element.file_path}`;
      const imageUrl = await convertImageUrl(url, headers);
      fileObj[row].push(imageUrl);
    }
  }

  setImageViewerArray2D([...imageViewerArray2D, ...fileObj]);
};



/**
   * Remove Image Row
   * @param {*} index 
   */
export const removeImageRow2D = (imageViewerArray2D, setImageViewerArray2D, removedIndex) => {
  let img = [...imageViewerArray2D];
  img = img.filter((img,id)=> id != removedIndex)
  setImageViewerArray2D(img);
};

/* Sample Code
const uploadMultipleFiles = (files) => {
  setImageFormdataArray(([...prevImageFormdataArray]) => [...prevImageFormdataArray, ...files] );
  setImageViewerArray(([...prevImageViewerArray]) => [
    ...prevImageViewerArray,
    ...Array.from(files, (file) => URL.createObjectURL(file))
  ]);
};


const handleRemoveImage = (id) => {
  setImageViewerArray(([...prevImageViewerArray]) => prevImageViewerArray.filter((_, i) => i !== id) );
  setImageFormdataArray(([...prevImageFormdataArray]) => prevImageFormdataArray.filter((_, i) => i !== id));
};

const removeImageRow2D = (imageViewerArray2D, setImageViewerArray2D, removedIndex) => {
  let img = [...imageViewerArray2D];
  img = img.filter((img,id)=> id != removedIndex)
  setImageViewerArray2D(img);
};
*/