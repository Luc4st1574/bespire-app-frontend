/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import SpinnerSmall from "../ui/Spinner";
import { showSuccessToast } from "../ui/toast";
import Button from "../ui/Button";
import Switch from "../ui/Switch";
import {
  UserPreferencesForm,
  userPreferencesSchema,
} from "@/schemas/userPreferencesSchema";
import { getTimeZones } from "@vvo/tzdb";

const TIMEZONES = getTimeZones().map((tz) => ({
  label: `${tz.name} (${tz.currentTimeFormat})`,
  value: tz.name,
}));

export default function UserPreferencesSettings() {
  const { preferences, updatePreferences, loading } = useUserPreferences();
  const [formError, setFormError] = useState<string | null>(null);

  const initialValues = useRef<UserPreferencesForm | null>(null);

  // Formulario RHF
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<UserPreferencesForm>({
    //@ts-ignore
    resolver: zodResolver(userPreferencesSchema),
    mode: "onChange",
    defaultValues: userPreferencesSchema.parse({}), // todos true + NY
  });

  // Sincroniza con valores actuales del usuario (¡siempre todos los campos completos!)
  useEffect(() => {
    if (preferences) {
      reset({
        timezone: preferences.timezone || "America/New_York",
        notifications: preferences.notifications ?? true,
        channels: {
          email: preferences.channels?.email ?? true,
          inApp: preferences.channels?.inApp ?? true,
          push: preferences.channels?.push ?? true,
        },
        newsletter: preferences.newsletter ?? true,
        specific: {
          requestsAlert: preferences.specific?.requestsAlert ?? true,
          brandsUpdate: preferences.specific?.brandsUpdate ?? true,
          filesUpdate: preferences.specific?.filesUpdate ?? true,
          mentionsComments: preferences.specific?.mentionsComments ?? true,
          sharedItems: preferences.specific?.sharedItems ?? true,
          lowOnCredits: preferences.specific?.lowOnCredits ?? true,
          paymentAlerts: preferences.specific?.paymentAlerts ?? true,
        },
      });
      initialValues.current = preferences;
    }
  }, [preferences, reset]);

  // Detecta cambios
  function getModifiedFields(values: UserPreferencesForm) {
    if (!initialValues.current) return values;
    const changed: Partial<UserPreferencesForm> = {};
    Object.entries(values).forEach(([key, val]) => {
      if (
        JSON.stringify((initialValues.current as any)[key]) !==
        JSON.stringify(val)
      ) {
        //@ts-ignore
        changed[key as keyof UserPreferencesForm] = val;
      }
    });
    return changed;
  }

  // Submit
  const onSubmit = async (data: UserPreferencesForm) => {
    setFormError(null);
    let toSave = getModifiedFields(data);
    console.log("Campos modificados:", toSave);

    const allowedFields = [
      "timezone",
      "notifications",
      "channels",
      "newsletter",
      "specific",
      // no incluyas hideQuickLinks ni hideGetStarted
    ];
    toSave = Object.fromEntries(
      Object.entries(toSave).filter(([key]) => allowedFields.includes(key))
    );

    if (Object.keys(toSave).length === 0) {
      setFormError("You haven't changed anything!");
      return;
    }
    try {
      await updatePreferences(toSave);
      showSuccessToast("Preferences updated!");
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong");
    }
  };

  const onError = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Watch para switches
  const watchChannels = watch("channels");
  const watchSpecific = watch("specific");
  const watchNotifications = watch("notifications");

  return (
    <form
      //@ts-ignore
      onSubmit={handleSubmit(onSubmit, onError)}
      id="user-preferences-form"
      className="flex flex-col gap-4"
    >
      <h2 className="font-medium text-lg ">General</h2>
      <div className="w-full mx-auto bg-[#F6F7F7] rounded-md p-8 flex flex-col gap-8">
        {formError && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {formError}
          </div>
        )}
        {/* General */}
        <div className="flex justify-between items-center gap-6 ">
          <span className="">Time zone</span>
          <div className="w-[300px]">
            <select
              {...register("timezone")}
              className={` bg-white block w-full border rounded-md p-2   ${
                errors.timezone ? "border-red-500" : "border-gray-300"
              }`}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            {errors.timezone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.timezone.message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Notifications */}
      <h2 className="font-medium text-lg ">Notifications</h2>
      <div className="w-full mx-auto bg-[#F6F7F7] rounded-md p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center border-b border-[#E2E6E4] py-3">
          <span>All notifications</span>
          <Switch
            checked={!!watchNotifications}
            onChange={(val) => {
              setValue("notifications", val, { shouldDirty: true });

              // Update all channels
              setValue("channels.email", val, { shouldDirty: true });
              setValue("channels.inApp", val, { shouldDirty: true });
              setValue("channels.push", val, { shouldDirty: true });

              // Update all specific notifications
              Object.keys(watchSpecific || {}).forEach((key) => {
                //@ts-ignore
                setValue(`specific.${key}` as any, val, { shouldDirty: true });
              });

              // Opcional: newsletter
              setValue("newsletter", val, { shouldDirty: true });
            }}
          />
        </div>
        {/* Channels */}
        <div className="flex justify-between items-start py-3">
          <span className="">Preferred Channels</span>
          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-2">
              <span>Email</span>
              <Switch
                checked={!!watchChannels?.email}
                onChange={(val) =>
                  setValue("channels.email", val, { shouldDirty: true })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <span>In-App</span>
              <Switch
                checked={!!watchChannels?.inApp}
                onChange={(val) =>
                  setValue("channels.inApp", val, { shouldDirty: true })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Mobile Push</span>
              <Switch
                checked={!!watchChannels?.push}
                onChange={(val) =>
                  setValue("channels.push", val, { shouldDirty: true })
                }
              />
            </div>
          </div>
        </div>
        {/* Newsletter */}
        <div className="flex justify-between items-center border-b border-[#E2E6E4] py-3">
          <span>Newsletter (Registered Email)</span>
          <Switch
            checked={!!watch("newsletter")}
            onChange={(val) =>
              setValue("newsletter", val, { shouldDirty: true })
            }
          />
        </div>
      </div>
      {/* Specific Notifications */}
      <h2 className="font-medium text-lg ">Specific Notifications</h2>
      <div className="w-full mx-auto bg-[#F6F7F7] rounded-md p-8 flex flex-col gap-4">
        {Object.entries(watchSpecific || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2">
            <span className="capitalize">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .replace("Update", "update")
                .replace("Alerts", "alerts")}
            </span>
            <Switch
              checked={!!value}
              //@ts-ignore
              onChange={(val) =>
                setValue(`specific.${key}` as any, val, { shouldDirty: true })
              }
            />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex justify-center items-center mt-6 gap-6">
        <Button
          type="button"
          variant="outlineG"
          size="lg"
          className="w-[200px]"
          onClick={() => {
            if (initialValues.current) reset(initialValues.current);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="gray" size="lg" className="w-[200px]">
          <div className="flex items-center justify-center gap-2">
            {loading && <SpinnerSmall color="text-black" />}
            <span>Save</span>
          </div>
        </Button>
      </div>
    </form>
  );
}
