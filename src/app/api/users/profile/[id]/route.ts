import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt  from 'bcryptjs';



interface Props {
  params: { id: string };
}

/**
 * @method  DELETE
 * @route   ~/api/users/profile/[:id]
 * @desc    Delete Profile
 * @access  private (only user himself can delete his account)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken !== null && userFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });

      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete his profile, forbiden" },
      { status: 403 } // forbiden
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server srror" },
      { status: 500 }
    );
  }
}

/**
 * @method  GET
 * @route   ~/api/users/profile/[:id]
 * @desc    Get Profile
 * @access  private (only user himself can get his account/profile)
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * @method  PUT
 * @route   ~/api/users/profile/[:id]
 * @desc    Update Profile
 * @access  private (only user himself can update his account/profile)
*/
export async function PUT(request:NextRequest, {params}:Props) {
  try {
    const user = await prisma.user.findUnique({where:{id: parseInt(params.id)}});
    if (!user){
      return NextResponse.json({message:'user not found'}, {status:404})
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        {message: 'you are not allowed, access denied'},
        {status:403}
      )
    }

    const body = await request.json() as UpdateUserDto;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt)
    }

    const updateUser = await prisma.user.update({
      where: {id:parseInt(params.id)},
      data: {
        username: body.username,
        email: body.email,
        password: body.password
      }
    })

    const {password, ...other} = updateUser
    
    return NextResponse.json( other, {status:200})

  } catch (error) {
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}