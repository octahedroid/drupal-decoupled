import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { syncDrupalPreviewRoutes } from "drupal-decoupled";

import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";

import './tailwind.css'
import './preview.css'

export const loader = async ({ context }: LoaderFunctionArgs ) => {
  return json(
    {
      environment: context.cloudflare.env.ENVIRONMENT,
    },
    { status: 200 }
  );
};


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { environment } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (environment === "preview" && navigation.state === "loading") {
    syncDrupalPreviewRoutes(navigation.location.pathname);
  }

  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </>
  );
}
