import { NextResponse, NextRequest } from "next/server";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";
import { JWTPayload } from "@/utils/types";

/**
 * @method  POST
 * @route   ~/api/users/login
 * @desc    Login User [(Log in) (Sing IN)]
 * @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    const token = generateJWT(jwtPayload);

    return NextResponse.json(
      { message: "Authenticated", token },
      { status: 200 }
    );
  } catch (error) {}
}
