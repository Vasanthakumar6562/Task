// import React from "react";
// import vasanth from "../assets/vasanth-1.jpeg"

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
//       <div className="max-w-xl w-full text-center">
//         {/* Image */}
//         <img
//           src={vasanth}
//           alt="vasanth"
//           className="mx-auto  mb-6 w-45 h-45 object-cover rounded-full"
//         />

//         {/* Greeting */}
//         <h2 className="text-xl text-gray-600 font-medium mb-2">
//           Hey <span className="font-semibold">GreatStack</span>! 👋
//         </h2>

//         {/* Title */}
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//           Welcome to our app
//         </h1>

//         {/* Subtext */}
//         <p className="text-gray-500 mb-6 px-2">
//           Let’s start with a quick product tour and we will have you up and
//           running in no time!
//         </p>

//         {/* Get Started Button */}
//         <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import { motion } from "framer-motion";
import vasanth from "../assets/vasanth-1.jpeg";

const Dashboard = () => {
  // Gradient text animation variants
  const gradientTextVariants = {
    hidden: { 
      opacity: 0,
      backgroundPosition: "0% 50%"
    },
    visible: {
      opacity: 1,
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        opacity: { duration: 0.8 },
        backgroundPosition: {
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-xl w-full text-center">
        {/* Profile Image */}
        <motion.img
          src={vasanth}
          alt="vasanth"
          className="mx-auto mb-6 w-45 h-45 object-cover rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2
          }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Greeting */}
        <motion.h2
          className="text-xl text-gray-600 font-medium mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Hey <span className="font-semibold">GreatStack</span>! 👋
        </motion.h2>

        {/* Animated Gradient Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          variants={gradientTextVariants}
          initial="hidden"
          animate="visible"
          style={{
            backgroundImage: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)",
            backgroundSize: "400% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block"
          }}
        >
          Welcome to our app
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-gray-500 mb-6 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Let's start with a quick product tour and we will have you up and
          running in no time!
        </motion.p>

        {/* Animated Button */}
        <motion.button
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium"
          variants={buttonVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover="hover"
          whileTap="tap"
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;