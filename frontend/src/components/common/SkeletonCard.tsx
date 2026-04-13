import { cn } from '@/lib/utils'

export function SkeletonCard() {
  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] w-full bg-gray-200 animate-pulse rounded-xl" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-full bg-gray-200 animate-pulse rounded-xl" />
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20 py-10 animate-pulse">
      {/* Left side: Image Skeleton */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-square bg-gray-200 rounded-xl" />
        <div className="flex gap-4 mt-4">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="w-20 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
      
      {/* Right side: Info Skeleton */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-1/3 bg-gray-200 rounded" />
        <div className="space-y-4">
          <div className="h-24 w-full bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-12 h-10 bg-gray-200 rounded" />)}
            </div>
          </div>
        </div>
        <div className="flex gap-4 h-12">
          <div className="w-32 bg-gray-200 rounded" />
          <div className="flex-1 bg-gray-200 rounded" />
          <div className="w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}
