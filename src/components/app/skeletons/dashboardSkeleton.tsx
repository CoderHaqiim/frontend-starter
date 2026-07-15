import Card from "@/src/components/ui/composites/card";
import Frame from "@/src/components/ui/primitives/frame";
import Skeleton from "../../ui/composites/skeleton";

export default function DashboardSkeleton() {
  return (
    <Frame
      width="stretch"
      direction="column"
      height="hug"
      className="gap-[var(--space-lg)]"
    >
      {/* Header */}
      <Frame width="stretch" direction="column" className="gap-[var(--space-xs)]">
        <Skeleton width="280px" height="32px" rounded="sm" />
        <Skeleton width="200px" height="16px" rounded="sm" />
      </Frame>

      {/* Summary Cards */}
      <Frame width="stretch" height="100px" className="gap-[var(--space-md)]">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            width="stretch"
            height="100px"
            rounded="md"
          >
            <></>
          </Skeleton>
        ))}
      </Frame>

      {/* Performance Chart */}
      <Skeleton width="stretch" height="300px" rounded="md"> </Skeleton>

      {/* Businesses Overview */}

        <Frame
          width="stretch"
          className="gap-[var(--space-lg)] overflow-hidden"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              width="300px"
              height="300px"
              rounded="md"

              className="shrink-0"
            />
          ))}
        </Frame>

      {/* Performance Ranking */}
      <Skeleton width="stretch" rounded="md">
        
      </Skeleton>

      {/* Latest Transactions */}
      <Skeleton width="stretch" rounded="md">
        
      </Skeleton>
    </Frame>
  );
}