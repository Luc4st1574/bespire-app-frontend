/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog } from '@headlessui/react';
import getCroppedImg from '@/utils/cropImage';
import { uploadImageToBackend } from '@/services/imageService';
import { ClipLoader } from 'react-spinners';

export default function AvatarUploader({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      //@ts-ignore
      const croppedBlob = await getCroppedImg(imageSrc!, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', croppedBlob, 'avatar.jpg');
      const res = await uploadImageToBackend(formData);
      onChange(res.url);
      setOpen(false);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("There was an error uploading your image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = () => {
    onChange("");
  };

  return (
    <>
      <div className={`flex items-center gap-6 ${className}`}>
        <div className="rounded-full p-1 bg-gradient-to-br from-[#f6ffe5] to-[#e7f2c9] border border-[#dde9ce] shadow-sm w-14 h-14 flex items-center justify-center">
          {value && !isUploading ? (
            <img
              src={value}
              className="w-11 h-11 object-cover rounded-full"
              alt="Avatar"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
              {/* Ícono genérico */}
              <svg width="30" height="30" fill="#3d6051"><circle cx="15" cy="15" r="14" stroke="#b2d69c" strokeWidth="2" fill="#e6f7db" /></svg>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
              <ClipLoader size={20} color="#3d6051" />
            </div>
          )}
        </div>
        {/* Acciones */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="avatar-upload"
            className="text-gray-700 underline cursor-pointer text-base hover:text-black"
            tabIndex={0}
          >
            Replace
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              tabIndex={-1}
            />
          </label>
          <button
            type="button"
            className="text-red-700 underline hover:text-red-900 text-base"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Modal cropper */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-4 rounded max-w-md w-full">
            <Dialog.Title className="text-lg text-center font-medium mb-4">Edit Photo</Dialog.Title>
            <div className="relative w-full h-64 bg-gray-100">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="w-full flex flex-col items-center gap-2 mt-4">
              <label>Zoom</label>
              <input
                className='w-full'
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(+e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-2 mt-6">
              <button
                className="border border-gray-300 bg-white rounded px-5 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
                type="button"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                className="bg-[#3d6051] text-white rounded px-6 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-[#355844]"
                onClick={handleSave}
                type="button"
                disabled={isUploading}
              >
                {isUploading && <ClipLoader size={16} color="#fff" />}
                {isUploading ? "Uploading..." : "Save"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
