"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  className?: string;
}

export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = "50px",
  placeholder,
  className = "",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {isVisible
        ? children
        : placeholder || (
            <div className="min-h-[200px] bg-gray-100 animate-pulse rounded-lg" />
          )}
    </div>
  );
}

// HOC for lazy loading components
export function withLazyLoad<T extends object>(
  Component: React.ComponentType<T>,
  placeholder?: ReactNode,
) {
  return function LazyComponent(props: T) {
    return (
      <LazyLoad placeholder={placeholder}>
        <Component {...props} />
      </LazyLoad>
    );
  };
}
