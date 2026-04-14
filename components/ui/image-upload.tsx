"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import type { ImageUploadFeature } from "@/lib/image-upload-config";

interface ImageUploadProps {
  /**
   * Feature identifier for configuration
   */
  feature: ImageUploadFeature;
  /**
   * Current image URL to display
   */
  currentImageUrl?: string | null;
  /**
   * Callback when image is selected and about to be uploaded
   */
  onImageSelect?: (file: File) => Promise<void>;
  /**
   * Callback when image URL changes after successful upload
   */
  onImageChange?: (imageUrl: string) => void;
  /**
   * Show loading state
   */
  isUploading?: boolean;
  /**
   * Error message to display
   */
  error?: string | null;
  /**
   * Custom label for the upload area
   */
  label?: string;
  /**
   * Disable the upload
   */
  disabled?: boolean;
}

/**
 * Reusable image upload component for any feature
 *
 * Features:
 * - Drag and drop support
 * - Image preview
 * - Loading states
 * - Error handling
 * - Works with any feature (configurable)
 *
 * Usage:
 * ```tsx
 * const { upload, isUploading, error } = useImageUpload({
 *   feature: "member",
 *   uploadAction: uploadMemberImage,
 * });
 *
 * <ImageUpload
 *   feature="member"
 *   currentImageUrl={member.imageUrl}
 *   isUploading={isUploading}
 *   error={error}
 *   onImageSelect={async (file) => {
 *     await upload({ file, memberId: resourceId });
 *   }}
 *   onImageChange={(url) => setValue("imageUrl", url)}
 * />
 * ```
 */
export function ImageUpload({
  feature,
  currentImageUrl,
  onImageSelect,
  onImageChange,
  isUploading = false,
  error = null,
  label,
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (file: File) => {
    // Create local preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);

    // Call the parent's upload handler
    try {
      setIsLoading(true);
      await onImageSelect?.(file);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageChange?.(undefined as unknown as string);
  };

  const isProcessing = isUploading || isLoading;

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-bold uppercase tracking-wide text-foreground/70">{label}</p>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border/40 bg-muted/20 hover:border-border/60",
          preview && "border-solid border-border/40",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {preview ? (
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={preview.startsWith("data:")}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                className="text-white hover:bg-white/20"
                disabled={isProcessing || disabled}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Subiendo
                  </>
                ) : (
                  <>
                    <Upload className="mr-1 h-4 w-4" />
                    Cambiar
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || disabled}
            className="block w-full p-8 text-center"
          >
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium text-muted-foreground">Subiendo imagen...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Sube una imagen</p>
                  <p className="text-xs text-muted-foreground">
                    Arrastra y suelta o haz clic para seleccionar
                  </p>
                </div>
              </div>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isProcessing || disabled}
          className="hidden"
          aria-label={`Subir imagen para ${feature}`}
        />
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 p-3">
          <p className="text-xs font-medium text-destructive">{error}</p>
        </div>
      )}

      {preview && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleClear}
          disabled={isProcessing || disabled}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar
        </Button>
      )}
    </div>
  );
}

