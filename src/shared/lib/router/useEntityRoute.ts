import { useNavigate } from "react-router-dom";

export const useEntityRoute = (basePath: string) => {
  const navigate = useNavigate();

  return {
    open: (id: string) => navigate(`${basePath}/${id}`),
    edit: (id: string) => navigate(`${basePath}/${id}/edit`),
    create: () => navigate(`${basePath}/create`),
    close: () => navigate(basePath),
  };
};
