export default function robots() {
  // Replace with your actual domain name once deployed
  const baseUrl = 'https://yourdomain.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
