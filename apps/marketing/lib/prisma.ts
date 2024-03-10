"use server";

import { db } from "@/lib/db";

export async function addUserIfNull(email: string) {
  try {
    // Check if the user already exists
    const user = await db.user.findUnique({
      where: {
        email: String(email),
      },
    });

    if (user) {
      return {
        message: "User is already subscribed.",
      };
    }

    // Create a new user and get the result of the creation
    const newUser = await db.user.create({
      data: {
        email: String(email),
      },
    });

    // Return a success response with the newly created user object
    return { success: true, user: newUser };
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error adding user:", error);

    // Return an error response
    return { error: "An error occurred while adding the user." };
  }
}
