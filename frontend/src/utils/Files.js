import { saveAs } from 'file-saver';

export const downloadPDFFrontendAuth = (fileContent,file_name,file_type) => {
  const blob = new Blob(
    [base64ToUint8Array(fileContent)],
    { type: file_type }
  );

  var blob_url = window.URL.createObjectURL(blob);
  window.open(blob_url, "_blank").focus();
}

export const downloadExcelFrontendAuth = (fileContent,file_name,file_type) => {
  const blob = new Blob(
    [base64ToUint8Array(fileContent)],
    { type: file_type }
  );

  saveAs(blob, file_name);
}

export const base64ToUint8Array = (string) => { 
  var raw = atob(string); 
  var rawLength = raw.length; 
  var buffer = new ArrayBuffer(rawLength);
  var array = new Uint8Array(buffer); 
  for (var i = 0; i < rawLength; i += 1) { 
    array[i] = raw.charCodeAt(i); 
  } 
  return array; 
}