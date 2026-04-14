/**
 * Generic Image Upload Configuration
 *
 * This provides a centralized configuration system for image uploads
 * across different features (members, books, events, etc.)
 */

export type ImageUploadFeature = "member" | "book" | "event" | "pilar" | "comment";

export interface ImageUploadConfig {
  feature: ImageUploadFeature;
  folder: string;
  maxSize: number; // in bytes
  allowedMimes: string[];
  quality?: string;
  fetchFormat?: string;
}

/**
 * Configuration presets for each feature
 */
export const IMAGE_UPLOAD_CONFIGS: Record<ImageUploadFeature, ImageUploadConfig> = {
  member: {
    feature: "member",
    folder: "sodu/members",
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    quality: "auto",
    fetchFormat: "auto",
  },
  book: {
    feature: "book",
    folder: "sodu/books",
    maxSize: 3 * 1024 * 1024, // 3MB
    allowedMimes: ["image/jpeg", "image/png", "image/webp"],
    quality: "auto",
    fetchFormat: "auto",
  },
  event: {
    feature: "event",
    folder: "sodu/events",
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimes: ["image/jpeg", "image/png", "image/webp"],
    quality: "auto",
    fetchFormat: "auto",
  },
  pilar: {
    feature: "pilar",
    folder: "sodu/pilars",
    maxSize: 3 * 1024 * 1024, // 3MB
    allowedMimes: ["image/jpeg", "image/png", "image/webp"],
    quality: "auto",
    fetchFormat: "auto",
  },
  comment: {
    feature: "comment",
    folder: "sodu/comments",
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedMimes: ["image/jpeg", "image/png", "image/webp"],
    quality: "auto",
    fetchFormat: "auto",
  },
};

/**
 * Get configuration for a specific feature
 */
export function getImageUploadConfig(feature: ImageUploadFeature): ImageUploadConfig {
  return IMAGE_UPLOAD_CONFIGS[feature];
}

/**
 * Validate file against feature configuration
 */
export function validateImageFile(
  file: File,
  feature: ImageUploadFeature
): { valid: true } | { valid: false; error: string } {
  const config = getImageUploadConfig(feature);

  if (file.size > config.maxSize) {
    return {
      valid: false,
      error: `El archivo debe ser menor a ${config.maxSize / 1024 / 1024}MB`,
    };
  }

  if (!config.allowedMimes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de archivo no permitido. Solo se permiten: ${config.allowedMimes.join(", ")}`,
    };
  }

  return { valid: true };
}

