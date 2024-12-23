
const useRoleAccess = (session: any, locale: number | undefined, role: string) => {
  const user = session.data?.user

  if (user === undefined || user.role === undefined || locale === undefined || session.status === 'loading' || session.status === "unauthenticated") return { hasAccess: false };

  if (user.locale?.includes(locale.toString())) return { hasAccess: true };

  const access = user.role.includes(role);

  return { hasAccess: access };
};

export default useRoleAccess;
