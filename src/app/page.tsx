"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MessageSquare,
  Home,
  MessageCircle,
  HelpCircle,
  Package,
  AlertCircle,
  Info,
  PhoneCall,
} from "lucide-react";
import Message from "@/components/homepage/Message";
import Help from "@/components/homepage/Help";
import HomePage from "@/components/homepage/Home";

type PopoverPage = "home" | "message" | "help";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PopoverPage>("home");
  const navbarHeight = "64px";

  const navigateTo = (page: PopoverPage) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "message":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <Message />
            </div>
            <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("home")}
              >
                <Home className="h-6 w-6" />
                <span className="font-medium">Home</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("message")}
              >
                <MessageCircle className="h-6 w-6" />
                <span className="font-medium">Messages</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("help")}
              >
                <HelpCircle className="h-8 w-8" />
                <span className="font-medium">Help</span>
              </Button>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <Help />
            </div>
            <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("home")}
              >
                <Home className="h-6 w-6" />
                <span className="font-medium">Home</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("message")}
              >
                <MessageCircle className="h-6 w-6" />
                <span className="font-medium">Messages</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("help")}
              >
                <HelpCircle className="h-8 w-8" />
                <span className="font-medium">Help</span>
              </Button>
            </div>
          </div>
        );

      default: // 'home'
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <HomePage onNavigate={navigateTo} />
            </div>
            <div className="flex justify-around p-2 bg-white rounded-b-2xl sticky bottom-0">
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("home")}
              >
                <Home className="h-6 w-6" />
                <span className="font-medium">Home</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("message")}
              >
                <MessageCircle className="h-6 w-6" />
                <span className="font-medium">Messages</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 h-auto text-gray-500 hover:text-[#f46117] cursor-pointer"
                onClick={() => navigateTo("help")}
              >
                <HelpCircle className="h-8 w-8" />
                <span className="font-medium">Help</span>
              </Button>
            </div>
          </div>
        );
    }
  };

  // return (
  //   <div
  //     className="flex flex-col items-center py-12 px-4 bg-gray-950 text-white min-h-[calc(100vh-64px)]"
  //     style={{ "--navbar-height": navbarHeight } as React.CSSProperties}
  //   >
  //     <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
  //       <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
  //         {/* Shipment Tracking Card */}
  //         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
  //           <div className="flex items-center gap-3 mb-4">
  //             <div className="p-2 rounded-lg bg-orange-500/10">
  //               <Package className="h-5 w-5 text-orange-500" />
  //             </div>
  //             <h2 className="text-xl font-semibold text-gray-100">
  //               Shipment Tracking
  //             </h2>
  //           </div>
  //           <p className="text-gray-300 mb-4">
  //             Users can input a tracking number to get real-time updates on the
  //             status of their consignments.
  //           </p>
  //           <p className="p-2 mb-2">
  //             dummy API to mimic an order tracking system. any combination of
  //             the following pairs should result in a successful response.
  //           </p>
  //           <div className="text-sm text-gray-300 bg-gray-800/50 p-4 rounded-lg border border-gray-700 overflow-x-auto">
  //             <code className="font-mono whitespace-pre-wrap break-words text-orange-400">
  //               {`consignmentNumbers = [48293, 15672, 90834, 76251, 34920]\nuserIds = ['1','2','3','4','5']`}
  //             </code>
  //           </div>
  //         </div>

  //         {/* Complaint Lodging Card */}
  //         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
  //           <div className="flex items-center gap-3 mb-4">
  //             <div className="p-2 rounded-lg bg-orange-500/10">
  //               <AlertCircle className="h-5 w-5 text-orange-500" />
  //             </div>
  //             <h2 className="text-xl font-semibold text-gray-100">
  //               Complaint Lodging
  //             </h2>
  //           </div>
  //           <p className="text-gray-300">
  //             The assistant helps users file complaints by collecting basic
  //             information (name, CNIC, telephone, category, and complaint
  //             details) and forwarding it to the relevant service endpoint.
  //           </p>
  //         </div>

  //         {/* General Information Card */}
  //         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
  //           <div className="flex items-center gap-3 mb-4">
  //             <div className="p-2 rounded-lg bg-orange-500/10">
  //               <Info className="h-5 w-5 text-orange-500" />
  //             </div>
  //             <h2 className="text-xl font-semibold text-gray-100">
  //               General Information Delivery
  //             </h2>
  //           </div>
  //           <p className="text-gray-300 mb-3">
  //             The assistant provides answers to queries about company services,
  //             service availability in different cities, package types, and more.
  //           </p>
  //           <a
  //             href="https://www.notion.so/Details-of-known-info-to-bot-1ce25e83154180089f69cbdaf1dc44a4"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="inline-flex items-center text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors group"
  //           >
  //             View detailed information document
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="16"
  //               height="16"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
  //             >
  //               <path d="M5 12h14"></path>
  //               <path d="m12 5 7 7-7 7"></path>
  //             </svg>
  //           </a>
  //         </div>

  //         {/* Customer Guidance Card */}
  //         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
  //           <div className="flex items-center gap-3 mb-4">
  //             <div className="p-2 rounded-lg bg-orange-500/10">
  //               <PhoneCall className="h-5 w-5 text-orange-500" />
  //             </div>
  //             <h2 className="text-xl font-semibold text-gray-100">
  //               Customer Guidance:
  //             </h2>
  //           </div>
  //           <p className="text-gray-300 mb-2">
  //             It can direct users to official contact channels (e.g., M&P
  //             helpline at 021 111 202 202 or www.mulphilog.com) for further
  //             assistance or formal procedures.
  //           </p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Chat Button */}
  //     <div className="fixed bottom-8 right-8 z-40">
  //       <Popover open={open} onOpenChange={setOpen}>
  //         <PopoverTrigger asChild>
  //           <Button
  //             className="h-14 w-14 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 p-0 flex items-center justify-center"
  //             aria-label="Open chat"
  //           >
  //             <MessageSquare className="h-6 w-6 text-white" />
  //           </Button>
  //         </PopoverTrigger>
  //         <PopoverContent
  //           className="w-80 sm:w-96 p-0 rounded-2xl border border-gray-700 shadow-2xl bg-gray-900 overflow-hidden"
  //           align="end"
  //           side="top"
  //           style={{ maxHeight: "calc(100vh - 90px)" }}
  //         >
  //           <div className="flex flex-col h-[500px]">{renderPage()}</div>
  //         </PopoverContent>
  //       </Popover>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className="flex flex-col items-center py-12 px-4 bg-gray-950 text-white min-h-[calc(100vh-64px)]"
      style={{ "--navbar-height": navbarHeight } as React.CSSProperties}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {/* Shipment Tracking Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Package className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Shipment Tracking
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Users can input a tracking number to get real-time updates on the
              status of their consignments.
            </p>
            <p className="p-2 mb-2">
              dummy API to mimic an order tracking system. any combination of
              the following pairs should result in a successful response.
            </p>
            <div className="text-sm text-gray-300 bg-gray-800/50 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <code className="font-mono whitespace-pre-wrap break-words text-orange-400">
                {`consignmentNumbers = [48293, 15672, 90834, 76251, 34920]\nuserIds = ['1','2','3','4','5']`}
              </code>
            </div>
          </div>

          {/* Complaint Lodging Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Complaint Lodging
              </h2>
            </div>
            <p className="text-gray-300">
              The assistant helps users file complaints by collecting basic
              information (name, CNIC, telephone, category, and complaint
              details) and forwarding it to the relevant service endpoint.
            </p>
          </div>

          {/* General Information Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Info className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                General Information Delivery
              </h2>
            </div>
            <p className="text-gray-300 mb-3">
              The assistant provides answers to queries about company services,
              service availability in different cities, package types, and more.
            </p>
            <a
              href="https://www.notion.so/Details-of-known-info-to-bot-1ce25e83154180089f69cbdaf1dc44a4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors group"
            >
              View detailed information document
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>

          {/* Customer Guidance Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <PhoneCall className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">
                Customer Guidance:
              </h2>
            </div>
            <p className="text-gray-300 mb-2">
              It can direct users to official contact channels (e.g., M&P
              helpline at 021 111 202 202 or www.mulphilog.com) for further
              assistance or formal procedures.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-40">
        {!open && (
          <div className="absolute -top-4 -left-24 flex items-center gap-2">
            <span className="text-2xl text-orange-400 bg-gray-800 px-2 py-1 rounded-lg shadow border border-gray-700 animate-bounce">
              Try me!
            </span>
          </div>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              className="h-14 w-14 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 p-0 flex items-center justify-center"
              aria-label="Open chat"
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 sm:w-96 p-0 rounded-2xl border border-gray-700 shadow-2xl bg-gray-900 overflow-hidden"
            align="end"
            side="top"
            style={{ maxHeight: "calc(100vh - 90px)" }}
          >
            <div className="flex flex-col h-[500px]">{renderPage()}</div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
