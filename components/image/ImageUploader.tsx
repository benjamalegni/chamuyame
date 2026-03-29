"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  selectedImage: string | null;
}

export default function ImageUploader({
  onImageSelected,
  selectedImage,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelected(file);
      }
    },
    [onImageSelected]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  if (selectedImage) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col">
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto max-h-56 object-contain"
          />
          <button
            type="button"
            onClick={() => onImageSelected(null as unknown as File)}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground/50 transition-colors hover:bg-foreground/70"
            aria-label="Quitar imagen"
          >
            <X className="h-4 w-4 text-background" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <label
      htmlFor="image-upload"
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`flex h-full min-h-[280px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-all ${
        isDragging
          ? "border-primary bg-muted"
          : "border-border bg-card hover:border-muted-foreground"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        id="image-upload"
      />
      <motion.div
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        className="mb-4 flex justify-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <ImagePlus className="h-5 w-5 text-muted-foreground" />
        </div>
      </motion.div>
      <p className="mb-1 text-sm font-medium text-foreground">
        Arrastra una imagen
      </p>
      <p className="text-xs text-muted-foreground">
        o haz clic para seleccionar
      </p>
    </label>
  );
}
