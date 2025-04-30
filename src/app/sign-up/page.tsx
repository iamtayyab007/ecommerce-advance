// /app/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center max-h-screen p-4 bg-purple-500">
      <SignUp forceRedirectUrl="/required-fields" />
    </div>
  );
}
