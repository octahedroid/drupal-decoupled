"use client";

import { syncDrupalPreviewRoutes } from "drupal-decoupled";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  environment: string;
}

export default function NavigationEvents({ environment }: Props) {
  const pathname = usePathname();
  const isRevision = pathname.includes("/revisions/");

  useEffect(() => {
    const url = `${pathname}`;
    if (environment === "preview" && !isRevision) {
      syncDrupalPreviewRoutes(url);
    }
  }, [pathname]);

  return null;
}
