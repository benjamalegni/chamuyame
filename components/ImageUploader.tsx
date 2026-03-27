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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto max-h-56 object-contain"
          />
          <button
            onClick={() => onImageSelected(null as unknown as File)}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`w-full border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
        isDragging
          ? "border-black bg-gray-50"
          : "border-gray-300 hover:border-gray-400 bg-white"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer block">
        <motion.div
          animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          className="flex justify-center mb-4"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <ImagePlus className="w-5 h-5 text-gray-600" />
          </div>
        </motion.div>
        <p className="text-sm font-medium text-gray-900 mb-1">
          Arrastra una imagen
        </p>
        <p className="text-xs text-gray-500">
          o haz clic para seleccionar
        </p>
      </label>
    </motion.div>
  );
}
