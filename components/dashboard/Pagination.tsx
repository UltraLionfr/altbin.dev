"use client";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 rounded-full text-sm transition-colors cursor-pointer ${
            currentPage === i + 1
              ? "bg-blue-600 text-white shadow-md"
              : "bg-neutral-800 text-white hover:bg-neutral-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}