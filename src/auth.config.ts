import { JWT } from '@auth/core/jwt';
import { Provider } from '@auth/core/providers';
import { tenantLinks } from '@/config/tenants';
import type { NextAuthConfig } from 'next-auth';

const clientId = 'catalog' // process.env.AUTH_CLIENT_ID as string;
const clientSecret = 'ItsMySecret' // = process.env.AUTH_CLIENT_SECRET as string;
const providers: Provider[] = [];

async function refreshAccessToken(token: JWT) {
  try {

    const response = await fetch(token.issuer + '/connect/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:  new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
        //scope: 'offline_access'
      }),
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expires_at: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

const addProvider = (id: string, name: string, issuer: string) => {
  const p: Provider = {
    id: id,
    name: name,
    type: 'oidc',
    issuer: issuer,
    wellKnown: `${issuer}/.well-known/openid-configuration`,
    authorization: {
      params: {
        scope: 'openid profile email catalog_api vehicle_api offline_access', // offline_access
      },
    },
    profile(profile: {
      sub: string;
      name: string;
      role: string[];
      email: string;
      picture: string;
      iss: string
    }) {
      return {
        ...profile,
        role: profile.role ?? ["user"],
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        id: profile.sub.toString(),
        iss: profile.iss
      };
    },
    clientId: clientId,
    clientSecret: clientSecret,
  };

  providers.push(p);
};

tenantLinks.map((t: any) => {
  addProvider(t.id, t.name, t.issuer);
});

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  trustHost: true,
  // basePath: 'api/auth',
  secret: 'zHe8c/tWWgICMKv53o7xZt8U9+Xiikv7b51w8iiLP5s=', //process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60  // 60 min
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unathenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

    async jwt({ token, account, user, profile }) {
      if (account && user && profile)  {
        token.accessToken =  account.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + account.expires_in!)
        token.refreshToken = account.refresh_token
        token.id_token = account.id_token
        token.role = user.role;
        token.locale = user.locale
        token.issuer = profile.iss as string
        token.sub = profile.sub as string
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expires_at! * 1000)-5000) {
        return token
      }

      // Access token has expired, try to update it
      console.log('Access token has expired, try to update it')
      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.id_token = token.id_token;
      session.user.role = token.role;
      session.user.locale = token.locale
      session.issuer = token.issuer as string
      session.userId = token.sub as string
      return session;
    },
  },
  providers: providers,
} satisfies NextAuthConfig;
