import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";

import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/bookmarks => getting bookmarks
export const GET = async () => {
  try {
    await connectDB();

    // userId
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser?.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database base on userId
    const user = await User.findOne({ _id: userId });
    // console.log("user in bookmarks : ", user);

    // Get users bookmarks
    // looking in the user's bookmarks array in the database
    // to see if there's a property that matches the _id in the property collection
    // bookmarks is a array of property objcects
    const bookmarks = await Property.find({ _id: { $in: user?.bookmarks } });

    // console.log("bookmarks -----> ", bookmarks);
    // return new  Response(JSON.stringify({ bookmarks }), { status: 200 });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/bookmarks => adding a bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    // propertyId
    const { propertyId } = await request.json();

    // userId
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser?.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database base on userId
    const user = await User.findOne({ _id: userId });

    // check to see if the property is already bookmarked
    let isBookmarked = user?.bookmarks?.includes(propertyId);

    let message;

    if (isBookmarked) {
      // if already bookmarked, remove it
      user?.bookmarks?.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // if not bookmarked, add it
      user?.bookmarks?.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    // save into the database
    await user?.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
