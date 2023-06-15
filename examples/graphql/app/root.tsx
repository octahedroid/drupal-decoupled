import type { LoaderFunction, LinksFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useLoaderData,
} from "@remix-run/react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { syncDrupalPreviewRoutes } from "drupal-remix";
import stylesheet from "~/tailwind.css";
import stylesheetPreview from "~/preview.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: stylesheetPreview },
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
  const navigation = useNavigation();
  if (environment === "preview" && navigation.state === "loading") {
    syncDrupalPreviewRoutes(navigation.location.pathname);
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
