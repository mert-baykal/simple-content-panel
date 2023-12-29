/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    secret_key: "ch+alt",
    // session_expires: Date.now() - 24 * 60 * 60 * 1000
     session_expires: Date.now() + (5 * 60 * 1000)
  },
   redirects() {
     return [
       {
         source: '/',
         destination: '/contents',
         permanent: false,
       },
     ]
   },
  reactStrictMode: false,
  api: {
    bodyParser: false,
  },
  // matcher: "/((?!api|static|.*\\..*|_next).*)",
}

module.exports = nextConfig
