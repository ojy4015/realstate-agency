// PropertyContacrForm page로부터 data를 받음
// handle POST request to submit  the message

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages (get messages)
export const GET = async () => {
  try {
    await connectDB();

    // get the user id
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.userId) {
      return new Response({ message: 'User ID is required' }, { status: 401 });
    }

    const { userId } = sessionUser;

    // get read messages
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate('sender', 'username')
      .populate('property', 'name');

    // get unread messages
    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort unread messages in asc order
      .populate('sender', 'username')
      .populate('property', 'name');

    // combine unread and read messages, move unread messages to the top
    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};

// POST /api/messages (submit messages)
export const POST = async (request) => {
  try {
    await connectDB();

    // get the data from form through the request body
    const { name, email, phone, message, recipient, property } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.userId) {
      return new Response(
        { message: 'You must be logged in to send a message' },
        { status: 401 }
      );
    }

    const { user } = sessionUser; // entire user

    // Cannot send message to self
    if (user?.id === recipient) {
      // return 1)string or 2) object with message that we are going to use
      return new Response(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user?.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    // save newMessage into the database
    await newMessage.save();

    // return new Response("Hello hyung", { status: 200 });
    // return new Response(JSON.stringify({ MESSAGE: "Success" }), {
    //   status: 200,
    // }); 나중에 MESSAGE활용 해야 할때

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
    });

    // // redirect from the server to the actual property page
    // return Response.redirect(
    //   `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    // );
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', {
      status: 500,
    });
  }
};
