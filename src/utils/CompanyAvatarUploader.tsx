/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog } from '@headlessui/react';
import getCroppedImg from '@/utils/cropImage'; // te paso este util abajo
import { uploadImageToBackend } from '@/services/imageService';
import Button from '../components/ui/Button';
import { ClipLoader } from 'react-spinners';
export default function CompanyAvatarUploader({
  avatarUrl,
  setAvatarUrl,
}: {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      const croppedBlob = await getCroppedImg(imageSrc!, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', croppedBlob, 'avatar.jpg');

      const res = await uploadImageToBackend(formData);
      setAvatarUrl(res.url);
      setOpen(false);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("There was an error uploading your image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="relative group cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden relative">
          {avatarUrl && !isUploading ? (
            <img src={avatarUrl} className="w-full h-full object-cover" alt="Company Avatar" />
          ) : null}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <ClipLoader size={20} color="#000" />
            </div>
          )}
        </div>
        <label className="w-6 h-6 absolute bottom-0 right-0 bg-lime-200 text-black
         rounded-full cursor-pointer p-1 text-xs group-hover:scale-110 transition
         flex items-center justify-center
         ">
          +
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

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


            <Button
          variant="outline"
          label="Cancel"
          className="w-full"
          onClick={() => setOpen(false)}
          type="button"
        ></Button>
           <Button
                variant="primary"
                label={isUploading ? "Uploading..." : "Save"}
                className="w-full flex items-center justify-center gap-2"
                onClick={handleSave}
                type="button"
                disabled={isUploading}
              >
                {isUploading && <ClipLoader size={16} color="#fff" />}
              </Button>



            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
