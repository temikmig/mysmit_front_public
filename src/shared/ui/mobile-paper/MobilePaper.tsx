import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { ContentBox, MobilePaperStyled, TitleBox } from "./MobilePaper.styled";

interface MobilePaperProps {
  title: string | ReactNode;
  children: ReactNode;
}

export const MobilePaper: FC<MobilePaperProps> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <MobilePaperStyled>
      <TitleBox>
        {typeof title === "string" && (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosIcon />
          </IconButton>
        )}
        {title}
      </TitleBox>
      <ContentBox>{children}</ContentBox>
    </MobilePaperStyled>
  );
};
