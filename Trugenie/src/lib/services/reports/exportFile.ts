export const getFileExtension = (filename: any) => {
  if (filename) {
    return filename.split(".").pop().toLowerCase();
  }
  return "";
};

const saveFile = (res: { blob: Blob; filename: string }) => {
  const url = window.URL.createObjectURL(res?.blob);
  const a = document.createElement("a");
  // const fileExtension = getFileExtension(res.filename);
  a.href = url;
  a.download = res?.filename; // Set the filename for the downloaded file
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};

export default saveFile;
