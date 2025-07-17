/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";

type Props = {
  value: string; // url actual
  onChange: (url: string) => void;
};

const ProfilePictureUploader: React.FC<Props> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Aquí deberías subir la imagen y obtener la URL final
      // Por ahora solo mostramos un preview temporal
      const url = URL.createObjectURL(file);
      onChange(url);
      // Para producción: subir a backend y setear la url final
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-[#f5fbe9] border-2 border-[#d7efbb] flex items-center justify-center">
        <img
          src={value || "/assets/icons/account.svg"}
          alt="Profile"
          className="w-14 h-14 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="text-sm text-[#3D6051] hover:underline"
          onClick={() => fileInputRef.current?.click()}
        >
          Replace
        </button>
        <button
          type="button"
          className="text-sm text-red-600 hover:underline"
          onClick={() => onChange("")}
        >
          Delete
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
