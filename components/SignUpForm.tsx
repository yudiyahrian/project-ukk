"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { z, ZodError, ZodIssue } from "zod";
import { Input } from "@components/ui/Input";
import { Button, Label } from "./ui";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface ValidationError {
  validation?: string | number;
  code: string;
  message: string;
}

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      schema.parse(formValues);
      const res = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
      if (!res.ok) {
        setErrors((await res.json()).message);
        return;
      }

      await signIn("credentials", {
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map(
          convertZodIssueToValidationError
        );
        setErrors(validationErrors);
      } else {
        // For unexpected errors
        setErrors([
          { code: "unexpected_error", message: "An unexpected error occurred" },
        ]);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label className="opacity-75">Name</Label>
        <Input
          name="name"
          type="text"
          placeholder="Your name"
          value={formValues.name}
          onChange={handleChange}
          className="mt-2"
        />
      </div>
      <div className="mb-4">
        <Label className="opacity-75">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="Your email address"
          value={formValues.email}
          onChange={handleChange}
          className="mt-2"
        />
      </div>
      <div className="mb-5">
        <Label className="opacity-75">Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Your password"
          value={formValues.password}
          onChange={handleChange}
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
      {errors.length > 0 && (
        <ul className="mt-4">
          {errors.map((error, index) => (
            <li key={index}>{getErrorText(error)}</li>
          ))}
        </ul>
      )}
    </form>
  );

  function convertZodIssueToValidationError(issue: ZodIssue): ValidationError {
    return {
      validation: issue.path[0],
      code: issue.code,
      message: issue.message,
    };
  }

  function getErrorText(error: ValidationError): string {
    switch (error.code) {
      case "invalid_string":
        return "Invalid email";
      case "too_small":
        return "Password must contain at least 6 characters";
      // Add more cases as needed for different error codes
      default:
        return "An error occurred";
    }
  }
}
