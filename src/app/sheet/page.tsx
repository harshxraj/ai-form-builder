// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

// import React, { useState } from "react";
// import { TestTubes } from "lucide-react";
// import TestSheet from "./TestSheet";

// type Props = {};

// const page = (props: Props) => {
//   const [openState, setOpenState] = useState(false);

//   const toggleSheet = () => {
//     setOpenState(!openState); // Toggles the state between true and false
//   };
//   const sampleQuestions = [{ text: "What is your name" }, { type: "TextBix" }];

//   return (
//     <>
//       <div>
//         <div>
//           <Button onClick={toggleSheet}>Test</Button>
//           {/* <Sheet open={openState}>
//             <SheetTrigger>Open</SheetTrigger>
//             <SheetContent onClick={() => toggleSheet()}>
//               <SheetHeader>
//                 <SheetTitle>Are you absolutely sure?</SheetTitle>
//                 <SheetDescription>
//                   This action cannot be undone. This will permanently delete
//                   your account and remove your data from our servers.
//                 </SheetDescription>
//               </SheetHeader>
//             </SheetContent>
//           </Sheet> */}
//           <TestSheet
//             openState={openState}
//             toggleSheet={toggleSheet}
//             question={sampleQuestions}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
