"use client";

import { useMemberImageUpload } from "../hooks/use-member-image-upload";
import { ImageUpload } from "@/components/ui/image-upload";

interface MemberImageUploadProps {
  memberId: string;
  currentImageUrl?: string | null;
  onImageChange?: (imageUrl: string) => void;
}

/**
 * Member-specific image upload component
 *
 * This is a wrapper around the generic ImageUpload component
 * that provides member-specific behavior and uploads.
 *
 * Usage:
 * ```tsx
 * <MemberImageUpload
 *   memberId="member-123"
 *   currentImageUrl={member.imageUrl}
 *   onImageChange={(url) => setValue("imageUrl", url)}
 * />
 * ```
 */
export function MemberImageUpload({
  memberId,
  currentImageUrl,
  onImageChange,
}: MemberImageUploadProps) {
  const { upload, isUploading, error } = useMemberImageUpload({
    memberId,
    onSuccess: (imageUrl) => {
      onImageChange?.(imageUrl);
    },
  });

  return (
    <ImageUpload
      feature="member"
      currentImageUrl={currentImageUrl}
      isUploading={isUploading}
      error={error}
      label="Imagen de perfil"
      onImageSelect={async (file: File) => {
        await upload(file);
      }}
      onImageChange={onImageChange}
    />
  );
}

