import { useQuery } from "@tanstack/react-query";

export const useCategoryOptions = {
  queryKey: ["getCategories"],
  queryFn: () =>
    fetch("https://moneymgrbackend.onrender.com/api/category", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json()),
};

export const useCategoryQuery = () => {
  return useQuery(useCategoryOptions);
};
