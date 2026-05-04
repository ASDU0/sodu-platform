"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadWorkshopImage } from "../actions/workshop-image-actions";

interface UseWorkshopImageUploadOptions {
  workshopId: string;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to handle workshop image uploads to Cloudinary
 *
 * Handles file validation, uploading, and error handling
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, error } = useWorkshopImageUpload({
 *   workshopId: "workshop-123",
 *   onSuccess: (url) => setImageUrl(url)
 * });
 *
 * await upload(file);
 * ```
 */
export function useWorkshopImageUpload({
  workshopId,
  onSuccess,
  onError,
}: UseWorkshopImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("workshopId", workshopId);

      const response = await uploadWorkshopImage(formData);

      if ("error" in response) {
        const errorMessage = response.error as string;
        setError(errorMessage);
        toast.error(errorMessage);
        onError?.(errorMessage);
        return null;
      }

      toast.success("Imagen subida exitosamente");
      onSuccess?.(response.imageUrl);
      return response.imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al subir imagen";
      setError(errorMessage);
      toast.error(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    upload,
    isUploading,
    error,
    clearError,
  };
}
