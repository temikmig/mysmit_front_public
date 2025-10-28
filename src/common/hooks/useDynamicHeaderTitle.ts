import { useEffect } from "react";
import { useMatches } from "react-router-dom";
import type { RouteHandle } from "../../components/types/routes";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../store/slices/uiSlice";

export const useDynamicHeaderTitle = (title?: string) => {
  const matches = useMatches();
  const dispatch = useDispatch();

  const match = matches.find((m) => (m.handle as RouteHandle)?.dynamicTitle);

  useEffect(() => {
    if (match && title) {
      dispatch(setHeaderTitle(title));
    }
  }, [dispatch, match, title]);
};
