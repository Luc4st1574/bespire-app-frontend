import { useAuth } from "./useAuth";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_PREFERENCES } from "@/graphql/mutations/user/updateUserPreferences";
import { useState, useEffect } from "react";
import { UserPreferencesForm, userPreferencesSchema } from "@/schemas/userPreferencesSchema";
import { useAppContext } from "@/context/AppContext";

export function useUserPreferences() {
  const { user, refetchUser:refetchProfile } = useAppContext();
  const [updatePreferencesMutation, { loading }] = useMutation(UPDATE_USER_PREFERENCES);
  const [preferences, setPreferences] = useState<UserPreferencesForm>(
    user?.preferences
      ? userPreferencesSchema.parse(user.preferences)
      : userPreferencesSchema.parse({})
  );

  useEffect(() => {
    setPreferences(
      user?.preferences
        ? userPreferencesSchema.parse(user.preferences)
        : userPreferencesSchema.parse({})
    );
  }, [user?.preferences]);

  // Puede recibir un solo campo, varios o todos
  const updatePreferences = async (prefs: Partial<UserPreferencesForm>) => {
    console.log("Updating preferences with:", prefs);
    await updatePreferencesMutation({
      variables: { input: prefs },
    });
    refetchProfile();
  };

  return {
    preferences,
    updatePreferences,
    loading,
  };
}
