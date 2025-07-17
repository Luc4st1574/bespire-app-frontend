/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Button from "../ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AvatarUploader from "@/utils/AvatarUploader";
import { UPDATE_USER_PROFILE } from "@/graphql/mutations/user/updateUserProfile";
import { useMutation } from "@apollo/client";
import SpinnerSmall from "../ui/Spinner";
import { showSuccessToast } from "../ui/toast";
import { useAppContext } from "@/context/AppContext";

// Definimos los campos extra
const formSchema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
     profilePicture: z
      .string()
      .url("Invalid URL")
      .optional()
      .or(z.literal("").or(z.literal(null))), 
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Si el usuario quiere cambiar la contraseña, valida ambos campos y sus mínimos
    if (data.newPassword || data.currentPassword) {
      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["currentPassword"],
          message: "You must enter your current password.",
        });
      } else if (data.currentPassword.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["currentPassword"],
          message: "Current password must be at least 8 characters.",
        });
      }
      if (!data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "You must enter a new password.",
        });
      } else if (data.newPassword.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["newPassword"],
          message: "New password must be at least 8 characters.",
        });
      }
    }
  });


type FormSchema = z.infer<typeof formSchema>;

export default function AccountSettings() {
  const { user, refetchUser:refetchProfile, loadingUser:loading } = useAppContext();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [updateUser, { loading:LoadingUpdateUser }] = useMutation(UPDATE_USER_PROFILE);
  const initialValues = useRef<FormSchema | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      const val = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        profilePicture: user.avatarUrl || "",
        currentPassword: "",
        newPassword: "",
      };
      reset(val);
      initialValues.current = val;
    }
  }, [reset, user]);

  const profilePicture = watch("profilePicture");

  function getModifiedFields(values: FormSchema) {
    const changed: Partial<FormSchema> = {};
    if (!initialValues.current) return values;
    Object.entries(values).forEach(([key, val]) => {
      // Password: sólo si ambos campos fueron llenados
      if ((key === "currentPassword" || key === "newPassword") && val) {
        changed[key] = val;
      } else if (
        key !== "currentPassword" &&
        key !== "newPassword" &&
        val !== (initialValues.current as any)[key]
      ) {
        //@ts-ignore
        changed[key] = val;
      }
    });
    return changed;
  }

  const onSubmit = async (data: FormSchema) => {
    setFormError(null);
    const toSave = getModifiedFields(data);
    if (Object.keys(toSave).length === 0) {
      setFormError("You haven't changed anything!");
      return;
    }
    // Si hay un intento de cambio de contraseña pero no están ambos campos, aborta (esto lo maneja el schema, pero por si acaso)
    if (
      ("currentPassword" in toSave && !("newPassword" in toSave)) ||
      (!("currentPassword" in toSave) && "newPassword" in toSave)
    ) {
      setFormError("You must complete both password fields.");
      return;
    }
    console.log("PATCH data to save:", toSave);
    try {
      const res = await updateUser({ variables: { input: toSave } });
      console.log("User updated:", res.data.updateUser);
      // feedback visual
      // Por ejemplo, toast("User updated!")
       showSuccessToast("User updated!");
      // Actualiza los valores iniciales:
      // initialValues.current = { ...initialValues.current, ...toSave, currentPassword: "", newPassword: "" }
     // reset({ ...initialValues.current, ...toSave, currentPassword: "", newPassword: "" });
      setShowPassword(false);
      refetchProfile(); // Refresca el perfil del usuario
    } catch (err: any) {
      // Muestra el mensaje del backend
      setFormError(err?.message || "Something went wrong");
    }
  };

  const onError = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


    if (loading)
    return (
      <>
        <div>
          <p className="text-center text-gray-500 mt-4">
            Loading account information...
          </p>
        </div>
      </>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} id="account-settings-form">
      <div className="max-w-6xl mx-auto bg-[#F6F7F7] rounded-md p-8 flex flex-col gap-4">
        {formError && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {formError}
          </div>
        )}

        {/* First Name */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">First Name</label>
          <div>
            <input
              {...register("firstName")}
              placeholder="Enter First Name"
              className={clsx(
                "bg-white outline-none mt-1 block w-full border rounded-md p-2",
                errors.firstName ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
        </div>
        {/* Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Last Name</label>
          <div>
            <input
              {...register("lastName")}
              placeholder="Enter last name"
              className={clsx(
                "bg-white outline-none mt-1 block w-full border rounded-md p-2",
                errors.lastName ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        {/* Profile Picture */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Profile Picture</label>
          <div>
            <AvatarUploader
            //@ts-ignore
              value={profilePicture}
              onChange={(url) =>
                setValue("profilePicture", url, { shouldDirty: true })
              }
            />
            {errors.profilePicture && (
              <p className="text-red-500 text-xs mt-1">{errors.profilePicture.message}</p>
            )}
          </div>
        </div>
        {/* Email */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Email</label>
          <div>
            <input
              {...register("email")}
              placeholder="Enter email"
              className={clsx(
                "bg-white outline-none mt-1 block w-full border rounded-md p-2 opacity-60 cursor-not-allowed",
                errors.email ? "border-red-500" : "border-gray-300"
              )}
              readOnly
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Password</label>
          <div>
            {!showPassword ? (
              <Button
                type="button"
                variant="gray"
                size="md"
                onClick={() => setShowPassword(true)}
                className="w-[200px]"
              >
                Change Password
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  {...register("currentPassword")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Current password"
                  className={clsx(
                    "bg-white outline-none mt-1 block w-full border rounded-md p-2",
                    errors.currentPassword ? "border-red-500" : "border-gray-300"
                  )}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
                )}
                <input
                  {...register("newPassword")}
                  type="password"
                  autoComplete="new-password"
                  placeholder="New password"
                  className={clsx(
                    "bg-white outline-none mt-1 block w-full border rounded-md p-2",
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  )}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                )}
                <Button
                  type="button"
                  variant="outlineG"
                  size="sm"
                  onClick={() => {
                    setShowPassword(false);
                    setValue("currentPassword", "");
                    setValue("newPassword", "");
                  }}
                  className="w-[100px]"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* Delete Account */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Delete Account</label>
          <Button
            type="button"
            variant="gray"
            size="md"
            onClick={() => console.log("clic en delete")}
            className="w-[200px]"
          >
            Request to Delete
          </Button>
        </div>
        {/* Export Data */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] items-center">
          <label className="font-medium">Export all</label>
          <Button
            type="button"
            variant="gray"
            size="md"
            className="w-[200px]"
            onClick={() => console.log("clic en export")}
          >
            Request all data
          </Button>
        </div>
      </div>
      {/* Footer Actions */}
      <div className="flex justify-center items-center mt-6 gap-6">
        <Button
          type="button"
          variant="outlineG"
          size="lg"
          className="w-[200px]"
          onClick={() => {
            if (initialValues.current) {
              reset({ ...initialValues.current, currentPassword: "", newPassword: "" });
              setShowPassword(false);
            }
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="gray" size="lg" className="w-[200px]">
         <div className="flex items-center justify-center gap-2">
        {LoadingUpdateUser && (<SpinnerSmall color="text-black"  /> )} 
         <span>Save</span>
         </div>
        </Button>
      </div>
    </form>
  );
}
