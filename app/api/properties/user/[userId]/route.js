// create the API route to get the any user's listings

import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // send back the properties for that specific user
    const properties = await Property.find({ owner: userId });

    // this response가 app>profile>page.jsx로 감
    // response는 "name": "young property" 상태
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
