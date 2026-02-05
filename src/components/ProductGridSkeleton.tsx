interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({ count = 6 }: ProductGridSkeletonProps) {
  return (
    <div className="products-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-skeleton">
          <div className="product-skeleton-image" />
          <div className="product-skeleton-content">
            <div className="product-skeleton-line" />
            <div className="product-skeleton-line short" />
            <div className="product-skeleton-line medium" style={{ animationDelay: `${i * 0.05}s` }} />
            <div className="product-skeleton-footer">
              <div className="product-skeleton-price" />
              <div className="product-skeleton-btn" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
