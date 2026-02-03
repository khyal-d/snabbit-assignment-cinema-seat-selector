
// import React from "react";

// export default function Toast({ message, onClose }) {
//   if (!message) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/30"
//         onClick={onClose}
//       />

//       {/* Toast card */}
//       <div className="relative w-[min(92vw,420px)] rounded-2xl border border-pink-200 bg-pink-50 px-5 py-4 shadow-xl">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <div className="text-sm font-semibold text-pink-900">
//               Booking Confirmed 🎉
//             </div>
//             <div className="mt-1 text-sm text-pink-800">
//               {message}
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg px-2 py-1 text-xs font-semibold text-pink-900 hover:bg-pink-100"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  // auto close after 5s
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* toast box */}
      <div className="relative w-[min(92vw,420px)] overflow-hidden rounded-2xl border border-emerald-300 bg-emerald-50 shadow-xl">
        <div className="p-5">
          <div className="text-sm font-semibold text-emerald-900">
            Booking Confirmed 🎉
          </div>
          <div className="mt-1 text-sm text-emerald-800">
            {message}
          </div>
        </div>

        {/* reverse loading bar */}
        <div className="h-1 w-full bg-emerald-100">
          <div className="h-full bg-emerald-500 animate-toast-reverse" />
        </div>
      </div>
    </div>
  );
}
