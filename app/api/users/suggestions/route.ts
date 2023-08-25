import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const users = await prismadb.user.findMany({
      where: {
        AND: [
          {
            followedBy: {
              none: {
                email: session.user.email,
              },
            },
          },
          {
            NOT: {
              email: session.user.email,
            },
          },
        ],
      },
      include: {
        followedBy: {
          select: {
            _count: true,
          },
        },
      },

      take: 5,
    });

    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "failure", message: error.message },
      { status: 500 }
    );
  }
};
