// app/cmd/colis/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-500" />
    </div>
  );
}
