import "reflect-metadata";

import { NextResponse, type NextRequest } from "next/server";
import { container } from "tsyringe";
import { UserService } from "../lib/service/user-service";

export async function GET(request: NextRequest) {
  console.log(request);
  const userService = container.resolve(UserService);

  const foundUser = await userService.findById(1);

  return NextResponse.json({ hello: foundUser.name });
}
