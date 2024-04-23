"use client";

import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Input } from "@components/ui/Input";
import { Button, Label } from "./ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be longer than 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be longer than 6 characters" }),
});

type UserSignUp = z.infer<typeof schema>;

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const _usernameRef = useRef<HTMLInputElement>(null);
  const _emailRef = useRef<HTMLInputElement>(null);
  const _passwordRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

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

  const { mutate: signUpFn } = useMutation({
    mutationFn: async ({ name, email, password }: UserSignUp) => {
      const payload: UserSignUp = {
        name,
        email,
        password,
      };
      setIsLoading(true);
      const res = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!res.ok) {
        const resJson = await res.json();
        return toast({
          title: resJson.code,
          description: resJson.message,
          variant: "destructive",
        });
      } else {
        await signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/",
        });
        return toast({
          description: "You're successfully sign up, signing in...",
        });
      }
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your sign up has an error, please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: UserSignUp) => {
    const payload: UserSignUp = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    signUpFn(payload);
  };

  const { ref: usernameRef, ...usernameRest } = register("name");
  const { ref: emailRef, ...emailRest } = register("email");
  const { ref: passwordRef, ...passwordRest } = register("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label className="opacity-75">Username</Label>
        <Input
          ref={(e) => {
            usernameRef(e);

            // @ts-ignore
            _usernameRef.current = e;
          }}
          {...usernameRest}
          type="text"
          placeholder="Username"
          className="mt-2"
        />
      </div>
      <div className="mb-4">
        <Label className="opacity-75">Email</Label>
        <Input
          ref={(e) => {
            emailRef(e);

            // @ts-ignore
            _emailRef.current = e;
          }}
          {...emailRest}
          className="mt-2"
          placeholder="Your email address"
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
        {isLoading ? null : <h4>Sign Up</h4>}
      </Button>
    </form>
  );
}
