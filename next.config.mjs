/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "images.ctfassets.net", 
            "scontent-mad2-1.cdninstagram.com",
            "scontent-mad1-1.cdninstagram.com" // Add this line
        ],
    },
}

export default nextConfig;