"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadBookImage } from "../actions/book-image-actions";

interface UseBookImageUploadOptions {
  bookId: string;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to handle book image uploads to Cloudinary
 *
 * Handles file validation, uploading, and error handling
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, error } = useBookImageUpload({
 *   bookId: "book-123",
 *   onSuccess: (url) => setImageUrl(url)
 * });
 *
 * await upload(file);
 * ```
 */
export function useBookImageUpload({
  bookId,
  onSuccess,
  onError,
}: UseBookImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bookId", bookId);

      const response = await uploadBookImage(formData);

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

