import { Users } from "@/app/models/users";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

export async function POST(request) {

  const errorMessage = 'Invalid email address or password';
  const { email, password } = await request.json();

  if (email && password) {
    const currentUser = Users.find(user => user.email == email && user.password == password);
    const tokenUser = { id: currentUser.id, email: currentUser.email };

    if (currentUser) {
      const token = jwt.sign(tokenUser, process.env.secret_key, {
        expiresIn: '1d',
      })

      const user = {
        name: currentUser.name,
        email: currentUser.email,
        id: currentUser.id
      }
      cookies().set('user-auth', {
        value: {
          token,
          user
        },
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30
      });

      return NextResponse.json({
        token,
        user,
        redirectUrl: '/contents'
      }, { status: 200, })
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  return NextResponse.json({ error: errorMessage }, { status: 401 });
}