import { Skeleton } from "./skeleton";

function LinkCardSkeleton() {
  return (
    <div className="flex gap-5 border p-6 break-all w-full overflow-x-hidden">
      <Skeleton className="h-32 w-32 ring ring-blue-500 self-start" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Skeleton className="h-6 rounded w-3/4 mb-2" />
        <Skeleton className="h-6 rounded w-1/2 mb-2" />
        <Skeleton className="h-6 rounded w-5/6 mb-2" />
        <Skeleton className="h-6 rounded w-1/4 mb-2" />
        <Skeleton className="h-4 rounded w-1/4 mb-2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export default LinkCardSkeleton;
