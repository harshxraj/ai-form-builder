// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { questions } from "@/db/schema";
// import { input } from "@nextui-org/react";

// import React from "react";

// type Props = {
//   openState: boolean;
//   toggleSheet: () => void;
//   question: any;
// };

// const TestSheet = (props: Props) => {
//   console.log(props.question);
//   return (
//     <Sheet open={props.openState}>
//       <SheetTrigger>Open</SheetTrigger>
//       <SheetContent onClick={() => props.toggleSheet()}>
//         <SheetHeader>
//           <SheetTitle>Are you absolutely sure?</SheetTitle>
//           <SheetDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </SheetDescription>
//         </SheetHeader>

//         {props.question.map(
//           (
//             q: any,
//             index: number // Make sure to specify the type of 'q' and add a unique key for each input
//           ) => (
//             <>
//               <Label className="mb-3">{q.text}</Label>
//               <Input className="mt-3" />
//             </>
//           )
//         )}
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default TestSheet;
