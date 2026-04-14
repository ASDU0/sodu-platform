"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadMemberImage } from "../actions/member-image-actions";

interface UseMemberImageUploadOptions {
  memberId: string;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to handle member image uploads to Cloudinary
 *
 * Handles file validation, uploading, and error handling
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, error } = useMemberImageUpload({
 *   memberId: "member-123",
 *   onSuccess: (url) => setImageUrl(url)
 * });
 *
 * const handleFileSelect = async (file: File) => {
 *   await upload(file);
 * };
 * ```
 */
export function useMemberImageUpload({
  memberId,
  onSuccess,
  onError,
}: UseMemberImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("memberId", memberId);

      const response = await uploadMemberImage(formData);

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

