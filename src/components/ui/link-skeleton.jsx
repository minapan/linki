import { Skeleton } from "./skeleton";

function LinkSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row justify-between max-w-full">
      <div className="flex flex-col items-start gap-2 rounded-lg sm:w-2/5">
        <Skeleton className="h-8 rounded w-3/4" />
        <Skeleton className="h-6 rounded w-1/2" />
        <div className="flex items-center gap-1">
          <div className="h-6 rounded w-3/4" />
        </div>
        <Skeleton className="h-6 rounded w-1/3 mb-4" />
        <Skeleton className="h-4 rounded w-1/4 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-52 rounded-xl w-52 mt-4" />
      </div>

      <div className="sm:w-3/5">
        <Skeleton className="h-10 rounded w-1/2 mb-4" />
        <Skeleton className="h-8 rounded w-3/4 mb-4" />
        <Skeleton className="h-52 rounded-xl w-52 mt-4" />
        <Skeleton className="h-8 rounded w-3/4 mt-4" />
        <Skeleton className="h-52 rounded-xl w-52 mt-4" />
      </div>
    </div>
  );
}

export default LinkSkeleton;
