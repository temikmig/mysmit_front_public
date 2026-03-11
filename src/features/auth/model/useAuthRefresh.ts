import { useEffect, useState } from "react";

import { setUser } from "@entities/user";
import { setToken, useRefreshMutation } from "@features/auth";
import { useAppDispatch } from "@shared/lib";

export const useAuthRefresh = () => {
  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const doRefresh = async () => {
      try {
        const res = await refresh().unwrap();
        dispatch(setToken(res));
        dispatch(setUser(res));
      } catch {
        console.error("Invalid token");
      } finally {
        setInitialized(true);
      }
    };

    doRefresh();
  }, [dispatch, refresh]);

  return { initialized };
};
