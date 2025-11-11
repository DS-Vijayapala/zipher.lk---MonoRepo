import NavBar from "@/components/shared/NavBar";
import { getSession } from "@/lib/session";
import { log } from "console";
import Image from "next/image";

export default async function Home() {

  const session = await getSession();

  console.log(`session: ${session?.accessToken}`);


  return (

    <div className="min-h-[200vh]">

      <header>
        <NavBar />
      </header>

      <main>
        <h1>Welcome to the Auth App</h1>
      </main>

    </div>

  );

}
