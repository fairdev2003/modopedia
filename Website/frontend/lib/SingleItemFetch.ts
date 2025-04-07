import axios from "axios";

export const FetchSingleItem = (id: string) => {
  const response: any = axios.get(
    `http://localhost:3005/api/item/get_item/${id}`,
  );

  return response.data;
};
