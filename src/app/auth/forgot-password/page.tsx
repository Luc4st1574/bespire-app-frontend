"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import PublicGuard from "@/components/PublicGuard";
import Button from "@/components/ui/Button";

const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION);
  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email }: Schema) => {
    await forgotPassword({ variables: { email } });
    alert("Check your email for the reset link");
  };

  return (
    <PublicGuard>
    <div className="w-full flex items-center justify-center z-10 relative px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-medium  ">
        Forgot Password
        </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col gap-2">
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

        
        

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            label={loading ? "Send..." : "Send Reset Link"}
            className="w-full  "
          >
          </Button>
        </form>
      
      </div>
    </div>
  </PublicGuard>
   
  );
}
