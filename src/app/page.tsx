"use client";

import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  console.log("user", user);

  if (!user) return <SignIn />;

  return (
    <div>
      Welcome! {user.primaryEmailAddress?.emailAddress} {user.id}
    </div>
  );
}
