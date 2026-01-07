let apiUrl;
if (typeof window !== 'undefined') {
  // Client-side: use the current host
  apiUrl = `${window.location.protocol}//${window.location.host}/api`;
} else {
  // Server-side: use environment variable
  const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development' ? 'http' : 'https';
  apiUrl = `${protocol}://${process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000'}/api`;
}

export const API_URL = apiUrl;

export const NOTE = {
  id: 'id',
  title: 'title',
  description: 'description',
  content: 'content',
  complete: 'complete'
}
