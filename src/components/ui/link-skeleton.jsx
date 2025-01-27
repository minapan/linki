import { Skeleton } from "./skeleton";

function LinkSkeleton() {
  return (
    <Skeleton className="flex flex-col gap-6 sm:flex-row justify-between max-w-full">
      <div className="flex flex-col items-start gap-2 rounded-lg sm:w-2/5">
        <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4" />
        <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2" />
        <div className="flex items-center gap-1">
          <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4" />
        </div>
        <div className="h-6 bg-gray-300 animate-pulse rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/4 mb-4" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
          <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
        </div>
        <div className="h-52 bg-gray-300 animate-pulse rounded-xl w-52 mt-4" />
      </div>

      <div className="sm:w-3/5">
        <div className="h-10 bg-gray-300 animate-pulse rounded w-1/2 mb-4" />
        <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4 mb-4" />
        <div className="h-52 bg-gray-300 animate-pulse rounded-xl w-52 mt-4" />
        <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4 mt-4" />
        <div className="h-52 bg-gray-300 animate-pulse rounded-xl w-52 mt-4" />
      </div>
    </Skeleton>
  );
}

export default LinkSkeleton;
