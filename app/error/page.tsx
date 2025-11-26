"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("msg");

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">Something Went Wrong</h1>
      <p className="text-red-600">
        We encountered a critical error while setting up your session.
      </p>
      {errorCode && (
        <p className="mt-4 text-sm text-gray-500">**Reference:** {errorCode}</p>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-primary text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
