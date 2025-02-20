"use client";

import { logout } from "@/lib/actions/logout";
import { useQueryClient } from "@tanstack/react-query";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const queryClient = useQueryClient();

  const onClick = () => {
    queryClient.clear();
    logout();
  };

  return (
    <div onClick={onClick} className="flex w-full items-center cursor-pointer gap-3">
      {children}
    </div>
  );
};
