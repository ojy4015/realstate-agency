// "use client";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useGlobalContext } from "@/context/GlobalContext";

// const MessageCard = ({ message }) => {
//   // console.log("message in MessageCard : ", message);
//   const [isRead, setIsRead] = useState(message.read);
//   const [isDeleted, setIsDeleted] = useState(false);

//   // global state in component
//   // const { setUnreadCount } = useGlobalContext();
//   const { unreadCount, setUnreadCount } = useGlobalContext();

//   const handleReadClick = async () => {
//     try {
//       const res = await fetch(`/api/messages/${message._id}`, {
//         method: "PUT",
//       });

//       if (res.status === 200) {
//         const { read } = await res.json(); // only need read
//         setIsRead(read); // local state
//         setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // global state
//         // setUnreadCount((unreadCount) =>
//         //   read ? unreadCount - 1 : unreadCount + 1 ); // global state
//         if (read) {
//           toast.success("Marked as read");
//         } else {
//           toast.success("Marked as new");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const handleDeleteClick = async () => {
//     try {
//       const res = await fetch(`/api/messages/${message._id}`, {
//         method: "DELETE",
//       });

//       if (res.status === 200) {
//         setIsDeleted(true);

//         if (!isRead) {
//           setUnreadCount((prevCount) => prevCount - 1); // global state
//         }
//         toast.success("Message Deleted");
//       } else {
//         toast.error("Message Not Deleted");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   if (isDeleted) {
//     return null;
//   }

//   return (
//     <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
//       {!isRead && (
//         <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
//           New
//         </div>
//       )}
//       <h2 className="text-xl mb-4">
//         <span className="font-bold">Property Inquiry:</span>{" "}
//         {message?.property?.name}
//       </h2>
//       <p className="text-gray-700">{message?.body}</p>
//       <ul className="mt-4">
//         <li>
//           <strong>Name:</strong> {message?.name}
//         </li>
//         <li>
//           <strong>Reply Email:</strong>
//           <a href={`mailto:${message?.email}`} className="text-blue-500">
//             {" "}
//             {message?.email}
//           </a>
//         </li>
//         <li>
//           <strong>Reply Phone:</strong>
//           <a href={`tel:${message?.phone}`} className="text-blue-500">
//             {" "}
//             {message?.phone}
//           </a>
//         </li>
//         <li>
//           <strong>Received:</strong>{" "}
//           {new Date(message?.createdAt).toLocaleString()}
//         </li>
//       </ul>
//       <button
//         // add handler
//         onClick={handleReadClick}
//         className={`1mt-4 mr-3  ${
//           isRead ? "bg-gray-300" : "bg-blue-500 text-white"
//         } py-1 px-3 rounded-md`}
//       >
//         {isRead ? "Mark As New" : "Mark As Read"}
//       </button>
//       <button
//         onClick={handleDeleteClick}
//         className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default MessageCard;

// 새로운 방법(useGlobal)
'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobal } from '@/context/GlobalContext';

const MessageCard = ({ message }) => {
  // context
  const { unreadCount, setUnreadCount } = useGlobal();

  // console.log("message in MessageCard : ", message);
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  // global state in component
  // const { setUnreadCount } = useGlobalContext();
  // const { unreadCount, setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      // we don't give any data because we just change(toggle) the read property.
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json(); // only need read
        setIsRead(read); // local state
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // global state
        // setUnreadCount((unreadCount) =>
        //   read ? unreadCount - 1 : unreadCount + 1 ); // global state
        if (read) {
          toast.success('Marked as read');
        } else {
          toast.success('Marked as new');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);

        if (!isRead) {
          setUnreadCount((prevCount) => prevCount - 1); // global state
        }
        toast.success('Message Deleted');
      } else {
        toast.error('Message Not Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // database에서는 삭제됐으나 화면에 나오지 않게 하기 위해
  if (isDeleted) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{' '}
        {message?.property?.name}
      </h2>
      <p className="text-gray-700">{message?.body}</p>
      <ul className="mt-4">
        <li>
          {/* <strong>Name:</strong> {message?.sender.name} */}
          <strong>Name:</strong> {message?.name}
        </li>
        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message?.email}`} className="text-blue-500">
            {' '}
            {message?.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message?.phone}`} className="text-blue-500">
            {' '}
            {message?.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message?.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        // add handler
        onClick={handleReadClick}
        className={`1mt-4 mr-3  ${
          isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
        } py-1 px-3 rounded-md`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
