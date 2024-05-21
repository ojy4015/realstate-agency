// // can share between multiple components

// "use client";

// import { useState, createContext, useContext } from "react";

// // create context
// const GlobalContext = createContext();

// // Create a provider
// // can provide GlobalContext to rest of application so that
// // we can access any values we put in this provider
// export function GlobalProvider({ children }) {
//   // global state
//   const [unreadCount, setUnreadCount] = useState(0);

//   return (
//     <GlobalContext.Provider
//       value={{
//         unreadCount,
//         setUnreadCount,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }

// // Create a custom hook to access context
// export function useGlobalContext() {
//   return useContext(GlobalContext);
// }

// 새로운 방법(useGlobal)
// can share between multiple components

"use client";

import { useState, createContext, useContext } from "react";

// create context
const GlobalContext = createContext();

// Create a provider
// can provide GlobalContext to rest of application so that
// we can access any values we put in this provider
const GlobalProvider = ({ children }) => {
  // global state
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to access context
const useGlobal = () => useContext(GlobalContext);

export { GlobalProvider, useGlobal };
