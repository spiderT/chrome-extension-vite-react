/**
 * 转换成base64
 * @param file
 * @returns base64
 */
export const fileToDataURL = (file: Blob): Promise<any> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve((e.target as FileReader).result);
    reader.readAsDataURL(file);
  });

/**
 * 转换成图片
 * @param dataURL
 * @returns img
 */
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
  });

/**
 * 图片 Blob 对象
 * @param canvas
 * @param type 图片格式
 * @param quality 图片展示质量
 * @returns 图片 Blob 对象
 */
const canvastoFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
};

/**
 * 图片压缩方法
 * @param file 图片文件
 * @param type 想压缩成的文件类型
 * @param quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async(file, type = 'image/jpeg', quality = 0.2) => {
  const fileName = file.name;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const base64 = await fileToDataURL(file);
  const img = await dataURLToImage(base64);
  canvas.width = img.width;
  canvas.height = img.height;
  context.clearRect(0, 0, img.width, img.height);
  context.drawImage(img, 0, 0, img.width, img.height);
  const blob = (await canvastoFile(canvas, type, quality)) as Blob;
  const newFile = await new File([blob], fileName, {
    type,
  });
  return newFile;
};

/**
 * 字节转KB
 * @param size
 * @returns size KB
 */
export const getSize = (size) => (size ? `${Math.round(size / 1000)}KB` : '0KB');
