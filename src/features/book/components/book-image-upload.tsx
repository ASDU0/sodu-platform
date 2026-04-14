"use client";

import { useBookImageUpload } from "../hooks/use-book-image-upload";
import { ImageUpload } from "@/components/ui/image-upload";

interface BookImageUploadProps {
  bookId: string;
  currentImageUrl?: string | null;
  onImageChange?: (imageUrl: string) => void;
}

/**
 * Book-specific image upload component
 *
 * This is a wrapper around the generic ImageUpload component
 * that provides book-specific behavior and uploads.
 *
 * Features:
 * - Validates image size and format per book feature config
 * - Uploads to Cloudinary with optimized settings for book covers
 * - Updates the database with the new image URL
 * - Supports temporary IDs for create forms
 *
 * Usage:
 * ```tsx
 * <BookImageUpload
 *   bookId="book-123"
 *   currentImageUrl={book.coverUrl}
 *   onImageChange={(url) => setValue("coverUrl", url)}
 * />
 * ```
 */
export function BookImageUpload({
  bookId,
  currentImageUrl,
  onImageChange,
}: BookImageUploadProps) {
  const { upload, isUploading, error } = useBookImageUpload({
    bookId,
    onSuccess: onImageChange,
  });

  return (
    <ImageUpload
      feature="book"
      currentImageUrl={currentImageUrl}
      isUploading={isUploading}
      error={error}
      label="Portada del libro"
      onImageSelect={async (file: File) => {
        await upload(file);
      }}
      onImageChange={onImageChange}
    />
  );
}

