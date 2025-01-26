import { ClientGreeting } from "./client-greeting";
import { HydrateClient, trpc } from "@/app/lib/trpc/server";
export default async function Home() {
  void trpc.hello.prefetch({ text: "world" });
  return (
    <HydrateClient>
      <ClientGreeting />
    </HydrateClient>
  );
}
