import { useState, useEffect } from 'react';

export default function useIntersection(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    console.log('ref', ref.current);
    if (!ref.current) return null;
    const observer = new IntersectionObserver(
      (e) => {
        setIntersecting(e[0].isIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref.current]);

  return isIntersecting;
}
