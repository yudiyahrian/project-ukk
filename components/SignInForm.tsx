"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { z, ZodError, ZodIssue } from "zod";
import { Input } from "@components/ui/Input";
import { Button, Label } from "./ui";
import { useRouter } from "next/navigation";
import { toast } from "@hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type UserSignIn = z.infer<typeof schema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const _emailRef = useRef<HTMLInputElement>(null);
  const _passwordRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  const { mutate: signInFn } = useMutation({
    mutationFn: async ({ email, password }: UserSignIn) => {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/",
      });
      setIsLoading(false);
      if (!res?.ok) {
        return toast({
          title: "Something went wrong.",
          description:
            "Invalid email or password, please insert correct credentials",
          variant: "destructive",
        });
      } else {
        router.back();
        router.refresh();
        return toast({
          description: "You're successfully sign in, now redirecting..",
        });
      }
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in has an error, please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: UserSignIn) => {
    const payload: UserSignIn = {
      email: data.email,
      password: data.password,
    };

    signInFn(payload);
  };

  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="opacity-75">Email</Label>
        <Input
          ref={(e) => {
            emailRef(e);

            // @ts-ignore
            _emailRef.current = e;
          }}
          {...emailRest}
          placeholder="Your email address"
          className="mt-2"
        />
      </div>
      <div className="mb-5">
        <Label className="opacity-75">Password</Label>
        <Input
          ref={(e) => {
            passwordRef(e);

            // @ts-ignore
            _passwordRef.current = e;
          }}
          {...passwordRest}
          type="password"
          placeholder="Your password"
          className="mt-2"
        />
      </div>
      <Button
        isLoading={isLoading}
        size="sm"
        type="submit"
        className="w-full mb-2"
      >
        {isLoading ? null : <h4>Sign In</h4>}
      </Button>
    </form>
  );
}
