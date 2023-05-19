import type { LoaderFunction, LinksFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
  useLoaderData,
} from "@remix-run/react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { syncDrupalPreviewRoutes } from "drupal-remix";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ context }) => {
  return json(
    {
      environment: context.ENVIRONMENT,
    },
    { status: 200 }
  );
};

export default function App() {
  const { environment } = useLoaderData() as { environment: string };
  // @TODO: Catch router change on remix router config file.
  const transition = useTransition();
  if (environment === "staging" && transition.state === "loading") {
    syncDrupalPreviewRoutes(transition.location.pathname);
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Container>
          <Header />
          <Outlet />
          <Footer />
        </Container>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
