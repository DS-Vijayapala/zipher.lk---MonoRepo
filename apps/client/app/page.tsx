"use client";

import NavBar from "@/components/shared/NavBar";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/auth/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;

  if (!session) return null;

  return (
    <div className="min-h-[200vh]">
      <header>
        <NavBar />
      </header>

      <main>
        <h1>Welcome to the {session.user.name}</h1>
      </main>
    </div>
  );
}

