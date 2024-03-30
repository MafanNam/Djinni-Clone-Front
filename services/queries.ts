import {useQuery} from "@tanstack/react-query";
import {getCategories, getCompanies, getCompany} from "@/services/api/orher";


export function useCategories(options={}) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
    ...options,
  });
}

export function useCompanies(options={}) {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: Infinity,
    ...options,
  });
}


export function useCompany(id: number, options={}) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompany(id),
    staleTime: Infinity,
    ...options,
  });
}