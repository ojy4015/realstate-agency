// update sepecific message

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// to solve issue about deploying to the vercel
export const dynamic = "force-dynamic";

// // GET /api/properties/:id
// export const GET = async (request, { params }) => {
//   try {
//     await connectDB();

//     const id = params.id;

//     if (!id) {
//       return new Response("Property ID is required", { status: 400 });
//     }

//     const property = await Property.findById(id);

//     if (!property) return new Response("Property Not Found", { status: 404 });

//     // return new Response("Hello hyung", { status: 200 });
//     return new Response(JSON.stringify(property), {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new Response("Something went wrong", {
//       status: 500,
//     });
//   }
// };

// // DELETE /api/properties/:id
// export const DELETE = async (request, { params }) => {
//   try {
//     const propertyId = params.id;
//     if (!propertyId) {
//       return new Response("Property ID is required", { status: 400 });
//     }

//     const sessionUser = await getSessionUser();

//     // Check for session
//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User ID is required", { status: 401 });
//     }

//     const { userId } = sessionUser;

//     await connectDB();

//     const property = await Property.findById(propertyId);

//     if (!property) return new Response("Property Not Found", { status: 404 });

//     // Verify ownership
//     if (property?.owner.toString() !== userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     await property.deleteOne();

//     // return new Response("Hello hyung", { status: 200 });
//     return new Response("Property Deleted", {
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);
//     return new Response("Something went wrong", {
//       status: 500,
//     });
//   }
// };

// PUT /api/messages/:messageId (updating field)
export const PUT = async (request, { params }) => {
  try {
    // message id
    const { messageId } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    // user id
    const { userId } = sessionUser;

    await connectDB();

    // Get message to update from the database
    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return new Response("Message Not Found", { status: 404 });
    }

    // Verify ownership
    if (existingMessage?.recipient?.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Update message to read/unread depending on the current status
    existingMessage.read = !existingMessage.read;

    // update message in database
    await existingMessage.save();

    return new Response(JSON.stringify(existingMessage), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};

// DELETE /api/messages/:messageId (deleting message)
export const DELETE = async (request, { params }) => {
  try {
    // message id
    const { messageId } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    // user id
    const { userId } = sessionUser;

    await connectDB();

    // Get message to update from the database
    const existingMessage = await Message.findById(messageId);

    if (!existingMessage) {
      return new Response("Message Not Found", { status: 404 });
    }

    // Verify ownership
    if (existingMessage?.recipient?.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // delete message in database
    await existingMessage.deleteOne();

    return new Response("message Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
