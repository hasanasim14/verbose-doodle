import { AlertCircle, Info, Package, PhoneCall } from "lucide-react";

// Currently not being used
const HeroSection = () => {
  return (
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
            dummy API to mimic an order tracking system. any combination of the
            following pairs should result in a successful response.
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
            information (name, CNIC, telephone, category, and complaint details)
            and forwarding it to the relevant service endpoint.
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
            It can direct users to official contact channels (e.g., M&P helpline
            at 021 111 202 202 or www.mulphilog.com) for further assistance or
            formal procedures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
