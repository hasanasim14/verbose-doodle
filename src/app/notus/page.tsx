// "use client";

// import type React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { MessageSquare, Home, MessageCircle, HelpCircle } from "lucide-react";
// import Message from "@/components/homepage/Message";
// import Help from "@/components/homepage/Help";
// import HomePage from "@/components/homepage/Home";
// import IframeComponent from "@/components/homepage/IframeComponent";

// type PopoverPage = "home" | "message" | "help";

// export default function ChatButton() {
//   const [open, setOpen] = useState(false);
//   const [currentUrl, setCurrentUrl] = useState("https://www.mulphilog.com/");
//   const [currentPage, setCurrentPage] = useState<PopoverPage>("home");

//   const navigateTo = (page: PopoverPage) => {
//     setCurrentPage(page);
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case "message":
//         return (
//           <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto">
//               <Message
//                 onUrlDetected={(url) => {
//                   setCurrentUrl(url);
//                 }}
//               />
//             </div>
//             <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("home")}
//               >
//                 <Home className="h-6 w-6" />
//                 <span className="font-medium">Home</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("message")}
//               >
//                 <MessageCircle className="h-6 w-6" />
//                 <span className="font-medium">Messages</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("help")}
//               >
//                 <HelpCircle className="h-8 w-8" />
//                 <span className="font-medium">Help</span>
//               </Button>
//             </div>
//           </div>
//         );

//       case "help":
//         return (
//           <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto">
//               <Help />
//             </div>
//             <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("home")}
//               >
//                 <Home className="h-6 w-6" />
//                 <span className="font-medium">Home</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("message")}
//               >
//                 <MessageCircle className="h-6 w-6" />
//                 <span className="font-medium">Messages</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("help")}
//               >
//                 <HelpCircle className="h-8 w-8" />
//                 <span className="font-medium">Help</span>
//               </Button>
//             </div>
//           </div>
//         );

//       default: // 'home'
//         return (
//           <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto">
//               <HomePage onNavigate={navigateTo} />
//             </div>
//             <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("home")}
//               >
//                 <Home className="h-6 w-6" />
//                 <span className="font-medium">Home</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("message")}
//               >
//                 <MessageCircle className="h-6 w-6" />
//                 <span className="font-medium">Messages</span>
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
//                 onClick={() => navigateTo("help")}
//               >
//                 <HelpCircle className="h-8 w-8" />
//                 <span className="font-medium">Help</span>
//               </Button>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center py-12 px-4 text-white h-full">
//       <div className="w-full max-w-4xl text-center mb-8">
//         <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
//           <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent">
//             This is not the Official M&P Website
//           </h1>
//         </div>
//       </div>

//       <IframeComponent currentUrl={currentUrl} />

//       {/* Chat Button - unchanged */}
//       <div className="fixed bottom-8 right-8 z-40">
//         {!open && (
//           <div className="absolute -top-4 -left-24 flex items-center gap-2">
//             <span className="text-2xl text-orange-400 bg-gray-800 px-2 py-1 rounded-lg shadow border border-gray-700 animate-bounce">
//               Try me!
//             </span>
//           </div>
//         )}

//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               className="h-14 w-14 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 p-0 flex items-center justify-center"
//               aria-label="Open chat"
//             >
//               <MessageSquare className="h-6 w-6 text-white" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent
//             className="w-80 sm:w-96 p-0 rounded-2xl border border-gray-700 shadow-2xl bg-gray-900 overflow-hidden"
//             align="end"
//             side="top"
//             style={{ maxHeight: "calc(100vh - 90px)" }}
//           >
//             <div className="flex flex-col h-[500px]">{renderPage()}</div>
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// }

const NotUs = () => {
  return <>not us</>;
};

export default NotUs;
