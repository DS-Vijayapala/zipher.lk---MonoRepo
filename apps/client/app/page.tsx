import AppBar from "@/components/shared/AppBar";
import { getSession } from "@/lib/session";
import { log } from "console";
import Image from "next/image";

export default async function Home() {

  const session = await getSession();

  console.log(`session: ${session?.accessToken}`);


  return (

    <div>

      <header>
        <AppBar />
      </header>

      <main>
        <h1>Welcome to the Auth App</h1>
      </main>

    </div>

  );

}
