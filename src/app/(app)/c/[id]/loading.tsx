import Container from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <Container className="flex flex-col gap-4 gap-y-8">
      <Skeleton className="h-10 w-[50%] ms-auto" />

      <div className="flex items-start gap-x-4">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-[90%]" />
          <Skeleton className="h-6 w-[75%]" />
          <Skeleton className="h-6 w-[80%]" />
        </div>
      </div>

      <Skeleton className="h-10 w-[40%] ms-auto" />

      <div className="flex items-start gap-x-4">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-[70%]" />
          <Skeleton className="h-6 w-[50%]" />
        </div>
      </div>

      <Skeleton className="h-10 w-[70%] ms-auto" />

      <div className="flex items-start gap-x-4">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-[90%]" />
          <Skeleton className="h-6 w-[75%]" />
        </div>
      </div>
    </Container>
  );
}

export default Loading;
