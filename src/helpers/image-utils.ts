/**
 * Reads a file as a data URL.
 * @param {File} file - The file to be read.
 * @returns {Promise<unknown>} A promise that resolves with the file content as a data URL.
 * @example
 * readFileAsDataURL(file).then(dataURL => console.log(dataURL));
 */
export const readFileAsDataURL = (file: File): Promise<unknown> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = event => {
      resolve(event.target?.result);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Resizes an image and returns the resized image as a data URL.
 * @param {number} maxHeight - The maximum height of the resized image.
 * @param {string} imageURL - The URL of the image to resize.
 * @param {HTMLCanvasElement} canvas - The canvas element to use for resizing the image.
 * @returns {Promise} A promise that resolves with the resized image as a data URL.
 * @example
 * resizeImage(100, imageURL, canvas).then(dataURL => console.log(dataURL));
 */
export const resizeImage = (
  maxHeight: number,
  imageURL: string,
  canvas: HTMLCanvasElement
): Promise<unknown> =>
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
