"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import MessageCard from "@/components/MessageCard";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch the messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          //   console.log("data ---> ", data);
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold">
          You have {messages.length} Messages
        </h1>
        {messages.length === 0 ? (
          <p>You have no messages</p>
        ) : (
          <div className="grid grid-cols-1">
            {messages.map((message) => (
              <section className="bg-blue-50">
                <div className="container m-auto py-24 max-w-6xl">
                  <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    <div className="space-y-4">
                      <MessageCard key={message._id} message={message} />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;
