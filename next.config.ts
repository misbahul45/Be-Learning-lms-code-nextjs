import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname:'/**'
            },
            {
                protocol: 'https',
                hostname: '"ik.imagekit.io',
                pathname:'/**'
            }
        ]
    }
}

export default nextConfig;
