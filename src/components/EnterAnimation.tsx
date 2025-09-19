"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface EnterAnimatedProps extends HTMLMotionProps<"div"> {
  index?: number;
  type?: "default" | "fast";
}

const EnterAnimated = React.forwardRef<HTMLDivElement, EnterAnimatedProps>(
  ({ index = 0, type = "default", ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        transform: "translateY(20px)",
        filter: "blur(1px)",
      }}
      animate={{
        opacity: 1,
        transform: "translateY(0)",
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        delay: index * (type === "fast" ? 0.03 : 0.12),
      }}
      {...props}
    />
  ),
);
EnterAnimated.displayName = "EnterAnimated";

export default EnterAnimated;

// "use client";

// import React, { createContext, useContext, useRef } from "react";

// // Create a context to track animation count
// const AnimationCountContext = createContext<{
//   getNextIndex: () => number;
//   reset: () => void;
// } | null>(null);

// export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const countRef = useRef(0);

//   const getNextIndex = () => {
//     const current = countRef.current;
//     countRef.current += 1;
//     return current;
//   };

//   const reset = () => {
//     countRef.current = 0;
//   };

//   return (
//     <AnimationCountContext.Provider value={{ getNextIndex, reset }}>
//       {children}
//     </AnimationCountContext.Provider>
//   );
// };

// interface EnterAnimationProps {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
//   resetCounter?: boolean;
// }

// const EnterAnimation: React.FC<EnterAnimationProps> = ({
//   children,
//   delay = 1200,
//   className = "",
//   resetCounter = false,
// }) => {
//   const animationContext = useContext(AnimationCountContext);
//   const childrenArray = React.Children.toArray(children);

//   if (resetCounter && animationContext) {
//     animationContext.reset();
//   }

//   return (
//     <div className={className}>
//       {childrenArray.map((child, index) => {
//         if (React.isValidElement(child)) {
//           const castedChild = child as React.ReactElement<any>;
//           const existingClassName =
//             (castedChild?.props?.className as string) || "";
//           const existingStyle =
//             (castedChild.props.style as React.CSSProperties) || {};

//           const animationIndex = animationContext
//             ? animationContext.getNextIndex()
//             : index;

//           return React.cloneElement(castedChild as React.ReactElement<any>, {
//             key: castedChild.key || index,
//             className: `${existingClassName} animate-enter`.trim(),
//             style: {
//               ...existingStyle,
//               animationDelay: `${animationIndex * delay}ms`,
//             },
//           });
//         }
//         return child;
//       })}
//     </div>
//   );
// };

// export default EnterAnimation;
