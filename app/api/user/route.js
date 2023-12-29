import { Users } from "@/app/models/users";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

export async function GET(request) {

  const currentUser = cookies().get("user-auth")?.value;

  if (!currentUser) {
    return NextResponse.json({ error: 'Yetkisiz giriş' }, { status: 401 });
  }

  const user = { ...currentUser, token: null };
  return NextResponse.json({ user }, { status: 200 });
}