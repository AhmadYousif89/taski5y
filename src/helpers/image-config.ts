export const readFileAsDataURL = (file: Blob) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = event => {
      resolve(event.target?.result);
    };
    reader.readAsDataURL(file);
  });
};

export const resizeImage = (
  maxHeight: number,
  imageURL: string,
  canvas: HTMLCanvasElement,
) =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      const context = canvas.getContext('2d');
      if (image.height > maxHeight) {
        image.width = (image.width * maxHeight) / image.height;
        image.height = maxHeight;
      }
      canvas.width = image.width;
      canvas.height = image.height;
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(image, 0, 0, image.width, image.height);
      resolve(canvas.toDataURL('image/webp'));
    };
    image.src = imageURL;
  });
