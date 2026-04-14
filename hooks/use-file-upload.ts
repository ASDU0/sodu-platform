"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { ImageUploadFeature } from "@/lib/image-upload-config";
import { validateImageFile } from "@/lib/image-upload-config";

interface UseImageUploadOptions<T> {
  /**
   * Server action that handles the actual upload
   */
  uploadAction: (input: unknown) => Promise<{
    success: boolean;
    data?: T;
    error?: string;
    details?: Record<string, string>;
  }>;
  /**
   * Feature name for validation and configuration
   */
  feature: ImageUploadFeature;
  /**
   * Callback when upload succeeds
   */
  onSuccess?: (data: T) => void;
  /**
   * Callback when upload fails
   */
  onError?: (error: string) => void;
  /**
   * Show toast notifications
   */
  showToast?: boolean;
}

export interface UploadImageInput {
  file: File;
  [key: string]: unknown;
}

/**
 * Generic hook for uploading images across all features
 * Handles file validation, loading states, and error handling
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, error } = useImageUpload({
 *   feature: "member",
 *   uploadAction: uploadMemberImage,
 *   onSuccess: (data) => setImageUrl(data.imageUrl),
 * });
 *
 * await upload({ file, memberId: "123" });
 * ```
 */
export function useImageUpload<T>({
  uploadAction,
  feature,
  onSuccess,
  onError,
  showToast = true,
}: UseImageUploadOptions<T>) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (input: UploadImageInput) => {
    const { file, ...extraData } = input;

    setError(null);
    setIsUploading(true);

    try {
      // Validate file before upload
      const validation = validateImageFile(file, feature);
      if (!validation.valid) {
        setError(validation.error);
        if (showToast) toast.error(validation.error);
        if (onError) onError(validation.error);
        return null;
      }

      // Call server action with validated file and extra data
      const response = await uploadAction({ file, ...extraData });

      if (!response.success) {
        const errorMessage = response.error || `No se pudo subir la imagen para ${feature}`;
        setError(errorMessage);
        if (showToast) toast.error(errorMessage);
        if (onError) onError(errorMessage);
        return null;
      }

      if (showToast) toast.success("Imagen subida exitosamente");
      if (response.data) {
        onSuccess?.(response.data);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al subir imagen";
      setError(errorMessage);
      if (showToast) toast.error(errorMessage);
      if (onError) onError(errorMessage);
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
