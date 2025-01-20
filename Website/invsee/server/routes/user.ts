import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { unknown, z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { db } from "@/prisma/prisma";
import { User } from "@prisma/client";

export const userRouter = router({
  getUsersByEmail: publicProcedure
    .input(z.string().includes("@"))
    .mutation(async (e) => {
      const { input } = e;

      const data = await db.user.findMany({
        where: {
          email: input,
        },
      });

      return data;
    }),

  checkIfUserExists: publicProcedure
    .input(z.string())
    .mutation(async (email) => {
      const { input } = email;

      const user = await db.user.findFirst({
        where: {
          email: input,
        },
      });
    }),

  getUserByEmail: publicProcedure.input(z.string()).mutation(async (e) => {
    const { input } = e;

    const data = await db.user.findFirst({
      where: {
        email: input,
      },
      include: {
        posts: true,
      },
    });

    return data;
  }),

  getSingleUser: protectedProcedure
    .input(z.string())
    .mutation(async (email) => {
      const { input } = email;

      const data = await db.user.findFirst({
        where: {
          email: input,
        },

        select: {
          id: true,
          email: true,
          password: false,
          nick: true,
          firstName: true,
          lastName: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return data;
    }),

  updateUserRole: publicProcedure
    .input(z.object({ email: z.string(), role: z.string() }))
    .mutation(async (input) => {
      const client = await connectMongo();
      const db = client.db("test");

      const { email, role } = input.input;

      const collection = db
        .collection("users")
        .updateOne({ email }, { $set: { role } });

      return collection;
    }),
  updateUserData: publicProcedure
    .input(
      z.object({
        email: z.string(),
        data: z.object({
          first_name: z.string(),
          last_name: z.string(),
          nick: z.string(),
          role: z.string(),
        }),
      }),
    )
    .mutation(async (input) => {
      const client = await connectMongo();
      const db = client.db("test");

      const { email, data } = input.input;

      console.log("data", { ...data, email });

      const collection = await db
        .collection("users")
        .updateOne({ email }, { $set: data });

      return collection;
    }),

  getFirstThreeUsers: publicProcedure.query(async () => {
    const users = await db.user.findMany({
      take: 3,
    });
    return users;
  }),

  checkIfUserExists: publicProcedure
    .input(z.string())
    .mutation(async (email) => {
      const { input } = email;

      const user = await db.user.findFirst({
        where: {
          email: input,
        },
      });
    }),

  login: publicProcedure
    .input(z.object({ emailInput: z.string(), passwordInput: z.string() }))
    .mutation(async ({ input }) => {
      const { emailInput, passwordInput } = input;
      console.log("Input", input);
      if (emailInput.length === 0 || input.passwordInput.length === 0) {
        return {
          error: "All fields are required.",
          error_code: 400,
        };
      }

      if (emailInput.includes("@") === false) {
        return {
          error: "Invalid email.",
          error_code: 400,
        };
      }

      console.log(passwordInput.length < 8);
      if (passwordInput.length < 8) {
        const returnData = {
          error: "Password should be at least 8 characters long.",
          error_code: 400,
        };
        console.log("Return data", returnData);
        return returnData;
      }
      const user = await db.user.findFirst({
        where: {
          email: emailInput,
          password: passwordInput,
        },
      });

      if (!user?.id) {
        const returnData = {
          error: "Invalid credentials.",
          error_code: 401,
        };
        console.log("Return data", returnData);
        return returnData;
      }

      const protectedUser = {
        ...user,
        password: "sranie w banie",
      };

      console.log("User", protectedUser);

      return {
        user: protectedUser,
      };
    }),
});

class LoginLogic {
  private checkemail(email: string) {
    if (email.length === 0 || email.includes("@") === false) {
      return {
        error: "Invalid email.",
        error_code: 400,
      };
    }
  }

  public async logIn(email: string, password: string) {
    this.checkemail(email);

    const user = await db.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user?.id) {
      return {
        error: "Invalid credentials.",
        error_code: 401,
      };
    }

    const protectedUser = {
      ...user,
      password: "sranie w banie",
    };

    return {
      user: protectedUser,
    };
  }
}
