import { Skeleton } from "./skeleton";

function LinkCardSkeleton() {
  return (
    <Skeleton className="flex gap-5 border p-6 break-all w-full overflow-x-hidden">
      <div className="h-32 w-32 bg-gray-300 animate-pulse ring ring-blue-500 self-start" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2" />
        <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2 mb-2" />
        <div className="h-6 bg-gray-300 animate-pulse rounded w-5/6 mb-2" />
        <div className="h-6 bg-gray-300 animate-pulse rounded w-1/4 mb-2" />
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/4 mb-2" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
        <div className="h-8 w-8 bg-gray-300 animate-pulse rounded-full" />
      </div>
    </Skeleton>
  );
}

export default LinkCardSkeleton;
