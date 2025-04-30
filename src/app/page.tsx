"use client";

import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) return <p>Please wait loading....</p>;
  // if (!isSignedIn) return <SignIn />;

  if (!user) {
    return <SignIn />;
  }
  console.log("user", user);

  useEffect(() => {
    const updateMetadata = async () => {
      if (user) {
        await axios.post("/api/after-sign-up", {
          clerkId: user.id,
        });
      }
    };

    updateMetadata();
  }, [isLoaded, user]);

  return (
    <div>
      Welcome! {user?.primaryEmailAddress?.emailAddress} {user?.id}{" "}
    </div>
  );
}
