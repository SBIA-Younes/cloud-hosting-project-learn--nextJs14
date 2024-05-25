import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}

/**
 * @method  DELETE
 * @route   ~/api/users/profile/[:id]
 * @desc    LDelete Profile
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
