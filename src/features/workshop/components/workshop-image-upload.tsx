"use client";

import { useWorkshopImageUpload } from "../hooks/use-workshop-image-upload";
import { ImageUpload } from "@/components/ui/image-upload";

interface WorkshopImageUploadProps {
  workshopId: string;
  currentImageUrl?: string | null;
  onImageChange?: (imageUrl: string) => void;
}

/**
 * Workshop-specific image upload component
 *
 * This is a wrapper around the generic ImageUpload component
 * that provides workshop-specific behavior and uploads.
 *
 * Features:
 * - Validates image size and format per workshop feature config
 * - Uploads to Cloudinary with optimized settings for workshop images
 * - Updates the database with the new image URL
 * - Supports temporary IDs for create forms
 *
 * Usage:
 * ```tsx
 * <WorkshopImageUpload
 *   workshopId="workshop-123"
 *   currentImageUrl={workshop.imageUrl}
 *   onImageChange={(url) => setValue("imageUrl", url)}
 * />
 * ```
 */
export function WorkshopImageUpload({
  workshopId,
  currentImageUrl,
  onImageChange,
}: WorkshopImageUploadProps) {
  const { upload, isUploading, error } = useWorkshopImageUpload({
    workshopId,
    onSuccess: onImageChange,
  });

  return (
    <ImageUpload
      feature="workshop"
      currentImageUrl={currentImageUrl}
      isUploading={isUploading}
      error={error}
      label="Imagen del taller"
      onImageSelect={async (file: File) => {
        await upload(file);
      }}
      onImageChange={onImageChange}
    />
  );
}
