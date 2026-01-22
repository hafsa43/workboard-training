import { useDebounce as useDebounceLib } from 'use-debounce';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue] = useDebounceLib(value, delay);
  return debouncedValue;
}