import useSWRInfinite from 'swr/infinite';

export default function useInfinite(limit) {
  return useSWRInfinite((index, prevData) => {
    if (prevData && !prevData.length) return null;
    if (!index) return `/api/posts?limit=${limit}`;

    const from = new Date(
      new Date(prevData[prevData.length - 1].date).getTime() - 1
    ).toJSON();
    return `/api/posts?from=${from}&limit=${limit}`;
  });
}
