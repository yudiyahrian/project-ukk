"use client";
import { useState } from "react";
import { Button } from "./ui";
import { cn } from "@/utils/utils";
import { signIn } from "next-auth/react";
import Icons from "./Icons";
import { useToast } from "@/hooks/use-toast";

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      // TOAST NOTIFICATION
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center")}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
        variant="outline"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
