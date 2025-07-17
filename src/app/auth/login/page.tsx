"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations/login";
import PublicGuard from "@/components/PublicGuard";
import Button from "@/components/ui/Button";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { login } = useAuthActions();
  const router = useRouter();

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);
  const [loadingState, setLoadingState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormSchema) => {
    setLoadingState(true);
    try {
      console.log("Login data", data);
      const { data: response } = await loginMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });

      const token = response?.login?.token;
      console.log("Login response", response);

      if (token) {
        login(token);
        location.href = "/dashboard"; // Redirigir al dashboard
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    } finally {
      setLoadingState(false);
    }
  };

   if (loadingState) {
      return <Spinner />;
    }

  return (
    <PublicGuard>
      <div className="w-full flex items-center justify-center z-10 relative px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-medium  ">Let’s Get to Work</h1>
            <p className="text-base text-[#353B38]">
              Everything you need, right where you need it.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-2"
          >
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="outline-none mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="outline-none mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <label className="block text-gray-700">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="/auth/forgot-password" className=" hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant={isValid ? "green2" : "primary"}
              label={loading ? "Logging in..." : "Log In"}
              className="w-full  "
            ></Button>
          </form>
        </div>
      </div>
    </PublicGuard>
  );
}
