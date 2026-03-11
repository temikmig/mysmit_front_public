import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ErrorCont, errorMessages } from "@features/error-cont";

export const ErrorPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code || !errorMessages[code]) {
      navigate("/error/404", { replace: true });
    }
  }, [code, navigate]);

  if (!code || !errorMessages[code]) return null;

  return <ErrorCont code={code} />;
};
