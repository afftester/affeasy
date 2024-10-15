const REDIRECT_SEGMENTS = [
  "pricing",
  "blog",
  "help",
  "changelog",
  "tools",
  "_static",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["@dub/ui", "@dub/utils"],
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
  },
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins.push(
        // mute errors for unused typeorm deps
        new webpack.IgnorePlugin({
          resourceRegExp:
            /(^@google-cloud\/spanner|^@mongodb-js\/zstd|^aws-crt|^aws4$|^pg-native$|^mongodb-client-encryption$|^@sap\/hana-client$|^snappy$|^react-native-sqlite-storage$|^bson-ext$|^cardinal$|^kerberos$|^hdb-pool$|^sql.js$|^sqlite3$|^better-sqlite3$|^ioredis$|^typeorm-aurora-data-api-driver$|^pg-query-stream$|^oracledb$|^mysql$|^snappy\/package\.json$|^cloudflare:sockets$)/,
        }),
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "assets.affeasy.link", // for Dub's static assets
      },
      {
        hostname: "dubassets.com", // for Dub's user generated images
      },
      {
        hostname: "www.google.com",
      },
      {
        hostname: "avatar.vercel.sh",
      },
      {
        hostname: "faisalman.github.io",
      },
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "pbs.twimg.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "media.cleanshot.cloud", // only for staging purposes
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://affeasy-access.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "app.dub.sh",
          },
        ],
        destination: "https://app.affeasy.link",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "app.dub.sh",
          },
        ],
        destination: "https://app.affeasy.link/:path*",
        permanent: true,
        statusCode: 301,
      },
      ...REDIRECT_SEGMENTS.map(
        (segment) => (
          {
            source: `/${segment}`,
            has: [
              {
                type: "host",
                value: "dub.sh",
              },
            ],
            destination: `https://affeasy.link/${segment}`,
            permanent: true,
            statusCode: 301,
          },
          {
            source: `/${segment}/:path*`,
            has: [
              {
                type: "host",
                value: "dub.sh",
              },
            ],
            destination: `https://affeasy.link/${segment}/:path*`,
            permanent: true,
            statusCode: 301,
          }
        ),
      ),
      {
        source: "/metatags",
        has: [
          {
            type: "host",
            value: "dub.sh",
          },
        ],
        destination: "https://affeasy.link/tools/metatags",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/metatags",
        has: [
          {
            type: "host",
            value: "affeasy.link",
          },
        ],
        destination: "/tools/metatags",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "staging.dub.sh",
          },
        ],
        destination: "https://affeasy.link",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "preview.dub.sh",
          },
        ],
        destination: "https://preview.affeasy.link",
        permanent: true,
        statusCode: 301,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "admin.dub.sh",
          },
        ],
        destination: "https://admin.affeasy.link",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
