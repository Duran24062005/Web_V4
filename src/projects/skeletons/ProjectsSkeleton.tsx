import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export function ProjectCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton height={192} />

      <div className="p-6">
        {/* Title skeleton */}
        <h3 className="text-xl font-bold mb-2">
          <Skeleton width="75%" />
        </h3>

        {/* Description skeleton */}
        <p className="text-gray-400 mb-4">
          <Skeleton count={2} />
        </p>

        {/* Technologies skeleton */}
        <div className="flex gap-2 mb-4">
          <Skeleton width={60} height={24} />
          <Skeleton width={80} height={24} />
          <Skeleton width={70} height={24} />
        </div>

        {/* Links skeleton */}
        <div className="mt-4 flex justify-between">
          <Skeleton width={60} />
          <Skeleton width={50} />
          <Skeleton width={50} />
        </div>
      </div>
    </div>
  )
}

interface SkeletonProps {
    quantity: number;
}

export function ProjectCardSkeletonGrid({ quantity }: SkeletonProps) {
  return (
    <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: quantity }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </SkeletonTheme>
  )
}
