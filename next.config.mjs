/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'id.pinterest.com/',
        // hostname: 'i.pinimg.com',
        // port: '',
        // pathname: '/pin/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      }
    ],
    // domains: ['i.pinimg.com']
  },
}

export default nextConfig;
