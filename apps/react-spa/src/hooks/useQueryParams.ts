import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export function useQueryParams<T extends Record<string, any>>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result as Partial<T>;
  }, [searchParams]);

  const setParams = useCallback(
    (updates: Partial<T>, replace = false) => {
      const newParams = new URLSearchParams(searchParams);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      setSearchParams(newParams, { replace });
    },
    [searchParams, setSearchParams]
  );

  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return { params, setParams, clearParams };
}