// Complete previous Homepage
import { ChevronRight, Mic, MessageSquare, Search } from "lucide-react";

type PopoverPage = "home" | "message" | "help";

interface HomePageProps {
  onNavigate?: (page: Exclude<PopoverPage, "home">) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="bg-[#f46117] text-white rounded-tl-2xl p-6">
        <div className="flex justify-between items-start mb-8"></div>
        <h2 className="text-3xl font-bold mb-2">Hi there 👋</h2>
        <p className="text-2xl font-bold">How can we help?</p>
      </div>

      <div className="p-4 flex-1 bg-[#f46117]">
        <div className="flex gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 flex-1 flex flex-col justify-center items-center gap-2 opacity-50 cursor-not-allowed pointer-events-none">
            <div className="bg-gray-100 p-3 rounded-full transition-colors duration-300">
              <Mic className="h-5 w-5 text-[#f46117]" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Speak to us!
            </span>
          </div>

          <div
            className="bg-white rounded-lg p-4 flex-1 flex flex-col justify-center items-center gap-2 cursor-pointer"
            onClick={() => onNavigate && onNavigate("message")}
          >
            <div className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-300">
              <MessageSquare className="h-5 w-5 text-[#f46117]" />
            </div>
            <span className="text-sm font-medium text-gray-600">
              Talk to us!
            </span>
          </div>
        </div>

        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-2 rounded-xl">
            <div className="bg-blue-50 hover:bg-[#f46117]/10 flex items-center px-4 py-3 rounded-xl transition-colors duration-300 cursor-pointer">
              <span className="text-black font-semibold flex-1 hover:text-[#f46117] transition-colors duration-200">
                Search for help
              </span>
              <Search className="h-5 w-5 text-[#f46117]" />
            </div>
          </div>

          <ul className="divide-y divide-gray-200">
            <li className="list-item group hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <span className="text-gray-800">M&P Timeline</span>
              <ChevronRight className="h-5 w-5 text-gray-400 stroke-[3] transition-colors duration-200 group-hover:text-[#f46117]" />
            </li>

            <li className="list-item group hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <span className="text-gray-800">
                Submitting Products for Distribution
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400 stroke-[3] transition-colors duration-200 group-hover:text-[#f46117]" />
            </li>

            <li className="list-item group hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <span className="text-gray-800">Shipping Times & Methods</span>
              <ChevronRight className="h-5 w-5 text-gray-400 stroke-[3] transition-colors duration-200 group-hover:text-[#f46117]" />
            </li>

            <li className="list-item group hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
              <span className="text-gray-800">Return Policy & Procedure</span>
              <ChevronRight className="h-5 w-5 text-gray-400 stroke-[3] transition-colors duration-200 group-hover:text-[#f46117]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
