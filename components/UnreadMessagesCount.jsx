// "use client";
// import { useState, useEffect } from "react";
// import { useGlobalContext } from "@/context/GlobalContext";

// const UnReadMessagesCount = ({ session }) => {
//   // local state in component
//   // const [unreadCount, setUnreadCount] = useState(0);

//   // global state in component
//   const { unreadCount, setUnreadCount } = useGlobalContext();

//   // get the number of unread messages
//   useEffect(() => {
//     if (!session) return;

//     const fetchUnreadMessagesCount = async () => {
//       try {
//         const res = await fetch("/api/messages/unread-count");
//         if (res.status === 200) {
//           const data = await res.json();
//           setUnreadCount(data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUnreadMessagesCount();
//   }, [session]);

//   return (
//     unreadCount > 0 && (
//       <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//         {unreadCount}
//       </span>
//     )
//   );
// };

// export default UnReadMessagesCount;

// 새로운 방법(useGlobal)
"use client";
import { useState, useEffect } from "react";
import { useGlobal } from "@/context/GlobalContext";

const UnReadMessagesCount = ({ session }) => {
  // context
  const { unreadCount, setUnreadCount } = useGlobal();

  // local state in component
  // const [unreadCount, setUnreadCount] = useState(0);

  // global state in component
  // const { unreadCount, setUnreadCount } = useGlobalContext();

  // get the number of unread messages
  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessagesCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessagesCount();
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnReadMessagesCount;
