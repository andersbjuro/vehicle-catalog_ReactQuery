import { useSession } from "next-auth/react";

export const useCurrentSession = () => {
  const session = useSession();


  const d = session.data
  return  {
    accessToken: d?.accessToken,
    user: d?.user,
    userId: d?.userId,
    status: session.status
  }
};
