// get number of count of unread messages

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count (get unread messages)
export const GET = async () => {
  try {
    await connectDB();

    // get the user id
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.userId) {
      return new Response({ message: "User ID is required" }, { status: 401 });
    }

    const { userId } = sessionUser;

    // get unread messages count
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort unread messages in asc order
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(count), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
