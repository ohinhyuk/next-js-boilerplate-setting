import "reflect-metadata";

export async function register() {
  if (process.env["NEXT_RUNTIME"] === "nodejs") {
    await import("reflect-metadata");

    Object.entries(process.env).forEach(([k, v]) => {
      if (!k.startsWith("DFAPP_")) return;
      console.log(`${k}=${v}`);
    });
  }
}
