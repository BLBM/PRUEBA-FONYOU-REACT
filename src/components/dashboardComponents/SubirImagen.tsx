import React, { useState } from 'react';
import {  Upload } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageUpload: (imageUrl: string) => void;
}

export const SubirImagen: React.FC<ImageUploaderProps> = ({ currentImage, onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'fonyouImages'); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dppdwla64/image/upload`, 
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      onImageUpload(data.secure_url);
      
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>
      {currentImage && (
        <div className="relative w-full h-64">
          <img src={currentImage} alt="Current character" className="w-full h-full object-cover rounded-lg" />
        </div>
      )}
      {isUploading && <p className="text-center text-gray-500">Uploading image...</p>}
    </div>
  );
};

