import { NextResponse } from "next/server";
import { Error } from "square";

export function handleErrors(errors: Error[]): NextResponse {
  return NextResponse.json(
    { errors: errors.map((e) => e.detail) },
    { status: 500 }
  );
}
