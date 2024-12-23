import { NextResponse, NextRequest} from 'next/server'
export const dynamic = "force-dynamic";

const handler = async (req: NextRequest) => {
  try {
    const issuerUrl = req.nextUrl.searchParams.get('issuer') as string
    const token = req.nextUrl.searchParams.get('id_token_hint') as string
    const endsessionURL = `${issuerUrl}/connect/endsession`
    const endsessionParams = new URLSearchParams({
      id_token_hint: token,
      post_logout_redirect_uri: process.env.AUTH_URL!,
    })

    return NextResponse.redirect(`${endsessionURL}?${endsessionParams}`);
  } catch (err) {
    return NextResponse.redirect(process.env.AUTH_URL as string);
  }
}
export const GET = handler;
