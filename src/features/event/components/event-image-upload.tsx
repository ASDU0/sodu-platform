"use client";

import { useEventImageUpload } from "../hooks/use-event-image-upload";
import { ImageUpload } from "@/components/ui/image-upload";

interface EventImageUploadProps {
  eventId: string;
  currentImageUrl?: string | null;
  onImageChange?: (imageUrl: string) => void;
}

/**
 * Event-specific image upload component
 *
 * This is a wrapper around the generic ImageUpload component
 * that provides event-specific behavior and uploads.
 */
export function EventImageUpload({
  eventId,
  currentImageUrl,
  onImageChange,
}: EventImageUploadProps) {
  const { upload, isUploading, error } = useEventImageUpload({
    eventId,
    onSuccess: onImageChange,
  });

  return (
    <ImageUpload
      feature="event"
      currentImageUrl={currentImageUrl}
      isUploading={isUploading}
      error={error}
      label="Imagen del evento"
      onImageSelect={async (file: File) => {
        await upload(file);
      }}
      onImageChange={onImageChange}
    />
  );
}

