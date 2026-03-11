import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, IconButton } from "@mui/material";
import { useState, useRef, useEffect, FC, ReactNode } from "react";

interface ExpandableBoxProps {
  children: ReactNode;
  maxCollapsedHeight?: number;
}

export const ExpandableBox: FC<ExpandableBoxProps> = ({
  children,
  maxCollapsedHeight = 40,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > maxCollapsedHeight);
    }
  }, [children, maxCollapsedHeight]);

  return (
    <Box display="flex" alignItems="flex-start">
      <Box
        ref={contentRef}
        sx={{
          maxHeight: expanded ? "none" : maxCollapsedHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {children}
      </Box>

      {isOverflowing && (
        <IconButton size="small" onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </Box>
  );
};
