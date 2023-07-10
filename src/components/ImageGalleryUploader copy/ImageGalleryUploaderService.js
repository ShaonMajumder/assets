export const convertImageUrlToFile = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error converting image URL to file:', error);
    return null;
  }
};
  
export const fetchDBImages = async (images,images_url,imageViewerArray,setImageViewerArray) => {
  let  fileObj = [];
  images.map((element, index) =>{
    fileObj.push(`${images_url}${element.file}`)
  })
  setImageViewerArray([...imageViewerArray, ...fileObj ])
}



export const fetchEditDBImages = async (images,images_url,imageViewerArray,setImageViewerArray,imageFormdataArray,setImageFormdataArray) => {  
  let  fileObjView = [];
  let  fileObjFD = [];

  for (let index = 0; index < images.length; index++) {
      const element = images[index];
      const url = `${images_url}${element.file}`;
  
      fileObjView.push(url);
      const file = await convertImageUrlToFile(url);
      fileObjFD.push(file);
  }

  setImageViewerArray([]);
  setImageFormdataArray([]);
  setImageViewerArray([...imageViewerArray, ...fileObjView ]);
  setImageFormdataArray([...imageFormdataArray, ...fileObjFD]);
}

export const fetchEditDBImages2D = async (images2D,images_url,imageViewerArray2D,setImageViewerArray2D,imageFormdataArray2D,setImageFormdataArray2D) => {  
  console.log(images2D)
  let  fileObjView = [];
  let  fileObjFD = [];

  for (let row = 0; row < images2D.length; row++) {
    fileObjView.push([]);
    fileObjFD.push([]);
    let images = images2D[row];
    for (let col = 0; col < images.length; col++) {
      const element = images[col];
      const url = `${images_url}${element.file}`;
  
      fileObjView[row].push(url);
      const file = await convertImageUrlToFile(url);
      fileObjFD[row].push(file);
    }
  }

  setImageViewerArray2D([...imageViewerArray2D, ...fileObjView ]);
  setImageFormdataArray2D([...imageFormdataArray2D, ...fileObjFD]);
}

export const fetchDBImages2D = async (images2D,images_url,imageViewerArray2D,setImageViewerArray2D) => {
  let  fileObj = [];
  images2D.map((images, row) =>{
    fileObj.push([]);
    images.map((element, col) =>{
      fileObj[row].push(`${images_url}${element.file}`)
    });
  })
  
  setImageViewerArray2D([...imageViewerArray2D, ...fileObj ])
}

/**
   * Remove Image Row
   * @param {*} index 
   */
export const removeImageRow2D = (imageViewerArray2D, setImageViewerArray2D, removedIndex) => {
  let img = [...imageViewerArray2D];
  img = img.filter((img,id)=> id != removedIndex)
  setImageViewerArray2D(img);
};