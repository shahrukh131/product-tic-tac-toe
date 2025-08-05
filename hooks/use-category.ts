import { CategoryType } from '@/interfaces/category'
import { useQuery } from '@tanstack/react-query'



export const useCategories = () => {
  return useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      return res.json()
    },
  })
}
