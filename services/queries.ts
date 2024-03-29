import {useQuery} from "@tanstack/react-query";
import {getCategories, getCompanies, getCompany} from "@/services/api/orher";


export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: Infinity,
  });
}


export function useCompany(id: number) {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompany(id),
    staleTime: Infinity,
  });
}