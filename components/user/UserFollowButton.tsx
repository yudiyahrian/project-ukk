"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { UserFollowValidator } from "@utils/validators/follow";
import { useRouter } from "next/navigation";

interface UserFollowButtonProps {
  userId: string;
  initialFollow?: boolean | null;
}

const UserFollowButton: FC<UserFollowButtonProps> = ({
  userId,
  initialFollow,
}) => {
  const { loginToast } = useCustomToast();
  const [currentFollow, setCurrentFollow] = useState(initialFollow);
  const prevFollow = usePrevious(currentFollow);
  const router = useRouter();

  useEffect(() => {
    setCurrentFollow(initialFollow);
  }, [initialFollow]);

  const { mutate: follow } = useMutation({
    mutationFn: async (followed: boolean) => {
      const payload: UserFollowValidator = {
        userId,
        followed,
      };

      const res = await fetch(`/api/user/follow`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setCurrentFollow(prevFollow);
        if (res.status === 401) {
          return loginToast();
        } else {
          return toast({
            title: "Something went wrong",
            description: "Your follow was not registered, please try again",
            variant: "destructive",
          });
        }
      }
      router.refresh();
    },
    onMutate: (followed: boolean) => {
      // Toggle current follow state
      setCurrentFollow(followed);
    },
  });

  return (
    <div className="w-full mt-2">
      <button
        type="button"
        onClick={() => follow(!currentFollow)}
        className={cn(
          "text-white font-medium rounded-lg text-sm w-full py-1.5 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 transition-all",
          {
            "bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300":
              currentFollow,
          }
        )}
      >
        {currentFollow === true ? "Followed" : "Follow"}
      </button>
    </div>
  );
};

export default UserFollowButton;
