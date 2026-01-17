import { BioPage } from "@/types/page";
import { storage } from "./storage";

export const sanitizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const validateUrl = (url: string): boolean => {
  return url.startsWith("http://") || url.startsWith("https://");
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validatePage = (
  page: Partial<BioPage>,
  originalSlug?: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!page.slug || page.slug.trim() === "") {
    errors.push({ field: "slug", message: "Slug é obrigatório" });
  } else if (page.slug !== originalSlug && storage.slugExists(page.slug)) {
    errors.push({ field: "slug", message: "Este slug já existe" });
  }

  if (!page.name || page.name.trim() === "") {
    errors.push({ field: "name", message: "Nome é obrigatório" });
  }

  if (!page.photo || page.photo.trim() === "") {
    errors.push({ field: "photo", message: "Foto de perfil é obrigatória" });
  }

  if (!page.description || page.description.trim() === "") {
    errors.push({ field: "description", message: "Descrição é obrigatória" });
  }

  if (!page.cards || page.cards.length === 0) {
    errors.push({ field: "cards", message: "Adicione pelo menos 1 card" });
  } else {
    page.cards.forEach((card, index) => {
      if (!card.image) {
        errors.push({ field: `card-${index}-image`, message: `Card ${index + 1}: imagem é obrigatória` });
      }
      if (!card.link || !validateUrl(card.link)) {
        errors.push({ field: `card-${index}-link`, message: `Card ${index + 1}: URL inválida` });
      }
    });
  }

  return errors;
};
