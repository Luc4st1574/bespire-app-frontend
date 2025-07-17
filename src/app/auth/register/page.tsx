'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@/graphql/mutations/register";
import PublicGuard from "@/components/PublicGuard";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import clsx from "clsx";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import Spinner from "@/components/Spinner";
const passwordRegex = {
  hasUppercase: /[A-Z]/,
  hasNumber: /\d/,
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/,
};
const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  contactNumber: z.string().min(8, "Phone number is required"),
  companyName: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  password: z.string()
    .min(8, "At least 8 characters")
    .refine((val) => passwordRegex.hasUppercase.test(val), {
      message: "At least 1 uppercase",
    })
    .refine((val) => passwordRegex.hasNumber.test(val), {
      message: "At least 1 number",
    })
    .refine((val) => passwordRegex.hasSpecial.test(val), {
      message: "At least 1 special character",
    }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const validatePassword = (password: string) => ({
  has8Chars: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasNumber: /\d/.test(password),
  hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

function ValidationCheck({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={isValid ? "text-green-600" : "text-gray-400"}>
        {isValid ? <img src="/assets/icons/check.svg" alt="" /> : <img src="/assets/icons/check-none.svg" alt="" />}
      </span>
      <span className={isValid ? "text-black" : "text-gray-500"}>{text}</span>
    </div>
  );
}

export default function RegisterPage() {
  const { refetchUser:refetchProfile } = useAppContext();
  const {login} = useAuthActions()
  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Mantén el password en el state para el validador visual
  const password = watch("password") || "";
  const validations = validatePassword(password);
  const isPasswordValid = Object.values(validations).every(Boolean);
  // Para el phone input
  useEffect(() => {
    register("contactNumber", { required: true });
  }, [register]);

  const acceptTerms = watch("acceptTerms");
  const canSubmit = isPasswordValid && acceptTerms;

  const onSubmit = async (data: FormSchema) => {
    setFormError(null);
    setLoadingRegister(true);
    try {
      const { data: response } = await registerMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            companyName: data.companyName,
            companyRole: data.role,
          },
        },
      });
      const token = response?.register?.token;

      if (token) {
        login(token);
       await refetchProfile()
        router.push("/auth/onboarding/step-1");
      } else {
        setFormError("Registration failed");
      }
    } catch (error: any) {
      setLoadingRegister(false);
      setFormError(error?.message || "Registration error");
    }
  };

  const onError = (errors: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loadingRegister) {
        return <Spinner />;
      }
  

  return (
    <PublicGuard>
      <div className="w-full flex items-center justify-center z-10 relative px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-medium">Let’s Get to Work</h1>
            <p className="text-base text-[#353B38]">
              Everything you need, right where you need it.
            </p>
          </div>

          {/* Error general arriba del form */}
          {formError && (
            <div className="mb-4 text-center text-red-600 font-semibold">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 text-sm" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>First Name</label>
                <input {...register("firstName")}
                  placeholder="Enter First Name"
                  className={clsx("outline-none mt-1 block w-full border rounded-md p-2",
                    errors.firstName ? "border-red-500" : "border-gray-300")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input {...register("lastName")}
                  placeholder="Enter Last Name"
                  className={clsx("outline-none mt-1 block w-full border rounded-md p-2",
                    errors.lastName ? "border-red-500" : "border-gray-300")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
              <div>
                <label>Work Email</label>
                <input {...register("email")}
                  placeholder="Enter Work Email"
                  className={clsx("outline-none mt-1 block w-full border rounded-md p-2",
                    errors.email ? "border-red-500" : "border-gray-300")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label>Contact Number</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={watch("contactNumber")}
                  onChange={(value) => setValue("contactNumber", value ?? "", { shouldValidate: true })}
                  country='us'
                  inputClass="input-phone"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
                )}
              </div>
              <div>
                <label>Company Name</label>
                <input {...register("companyName")}
                  placeholder="Company Name"
                  className={clsx("outline-none mt-1 block w-full border rounded-md p-2",
                    errors.companyName ? "border-red-500" : "border-gray-300")}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
                )}
              </div>
              <div>
                <label>Role</label>
                <input {...register("role")}
                  placeholder="Role"
                  className={clsx("outline-none mt-1 block w-full border rounded-md p-2",
                    errors.role ? "border-red-500" : "border-gray-300")}
                />
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => {
                    setValue("password", e.target.value, { shouldValidate: true });
                  }}
                  value={password}
                  className={clsx(
                    "outline-none mt-1 block w-full border rounded-md p-2  transition",
                    errors.password ? "border-red-500" :
                      isPasswordValid ? "border-green-500 bg-[#F6FFF2]" : "border-gray-300"
                  )}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-xs text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
             
              <div className="grid grid-cols-2 gap-2 mt-2">
                <ValidationCheck isValid={validations.has8Chars} text="At least 8 characters" />
                <ValidationCheck isValid={validations.hasUppercase} text="At least 1 uppercase" />
                <ValidationCheck isValid={validations.hasNumber} text="At least 1 number" />
                <ValidationCheck isValid={validations.hasSpecial} text="At least 1 special character" />
              </div>
            </div>

            <label className="text-sm flex items-start gap-2 mt-4">
              <input type="checkbox" {...register("acceptTerms")} className="mt-1" />
              <span>
                I agree to Bespire’s{" "}
                <a href="/terms" className="text-[#697D67] underline ">Terms of Use</a> and{" "}
                <a href="/privacy" className="text-[#697D67] underline">Privacy Policy</a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
            )}

            <Button
              type="submit"
              disabled={ loadingRegister}
              variant={canSubmit ? "green2" : "primary"}
              label={loadingRegister ? "Registering..." : "Agree and Sign Up"}
              className="w-full mt-4"
            />
          </form>
        </div>
      </div>
    </PublicGuard>
  );
}
