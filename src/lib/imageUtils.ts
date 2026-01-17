const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const validateImage = (file: File): string | null => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Formato não suportado. Use JPG, PNG ou WebP.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Imagem muito grande. Máximo de 2MB.";
  }
  return null;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const generateId = (): string => {
  return `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
