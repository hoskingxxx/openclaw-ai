import { redirect } from 'next/navigation';

/**
 * /icon.png → /icon (Redirect)
 *
 * Some browsers and crawlers automatically request /icon.png.
 * This route redirects those requests to the actual icon route.
 */
export async function GET() {
  // Redirect to the actual icon route
  redirect('/icon');
}
