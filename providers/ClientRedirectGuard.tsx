"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function ClientRedirectGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user && !user.publicMetadata?.requiredFieldsCompleted) {
      router.replace("/required-fields");
    }
  }, [isLoaded, user, router]);

  return <>{children}</>;
}
