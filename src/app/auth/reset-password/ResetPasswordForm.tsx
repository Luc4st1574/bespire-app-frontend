"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import PublicGuard from "@/components/PublicGuard";
import Button from "@/components/ui/Button";

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

const schema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type Schema = z.infer<typeof schema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!token) router.push("/auth/login");
  }, [token, router]);

  const onSubmit = async ({ newPassword }: Schema) => {
    await resetPassword({ variables: { token, newPassword } });
    alert("Password successfully reset!");
    router.push("/auth/login");
  };

  return (
    <PublicGuard>
      <div className="w-full flex items-center justify-center z-10 relative px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-medium">
              Reset Password
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-2">
            <div>
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                {...register("newPassword")}
                className="outline-none mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Confirm New Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="outline-none mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              label={loading ? "Resetting..." : "Reset Password"}
              className="w-full"
            >
            </Button>
          </form>
        </div>
      </div>
    </PublicGuard>
  );
}
