import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from '@auth/core/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string,
   // expires_At?: number,
    refreshToken?: string,
    id_token?: string,
    issuer?: string,
    userId?: string,
    user: {
      id: string,
      role?: string[],
      locale?: string[],
      name: string,
      email: string,
      image: string,
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role?: string[],
    locale?: string[]
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    role?: string[],
    locale?: string[],
    accessToken?: string,
    expires_at?: number,
    refreshToken?: string,
    id_token?: string
    issuer?: string | null
    sub?: string | null
  }
}
