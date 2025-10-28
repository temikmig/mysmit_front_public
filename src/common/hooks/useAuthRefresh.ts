import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";
import { useRefreshMutation } from "../../api/authApi";

export const useAuthRefresh = () => {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const doRefresh = async () => {
      try {
        const res = await refresh().unwrap();
        dispatch(setAuth(res));
      } catch {
        console.log("Invalid token");
      } finally {
        setInitialized(true);
      }
    };

    doRefresh();
  }, [dispatch, refresh]);

  return { initialized };
};
