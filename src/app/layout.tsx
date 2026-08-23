import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/components/GlobalStyle";
import DocsLayout from "@/components/DocsLayout";

const SITE_NAME = "Indo AI Docs";
const SITE_DESCRIPTION =
  "Official documentation for Indo AI Bridge devices \u2014 device setup, event actions, false detection reduction, VMS/alarm monitoring integrations, and cloud service guides.";

// TODO: set this to your real production domain once it's live (or set the
// SITE_URL env var at build time) - otherwise share-preview images (OG/Twitter
// cards) will resolve to an incorrect fallback URL when the site is deployed.
const SITE_URL = process.env.SITE_URL || "https://docs.indoai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s \u2013 ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/assets/og-card.png",
        width: 1200,
        height: 630,
        alt: "Indo AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/assets/og-card.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <DocsLayout>{children}</DocsLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
