"use client";

import { logout } from "@/lib/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <div onClick={onClick} className="flex w-full items-center cursor-pointer gap-3">
      {children}
    </div>
  );
};
