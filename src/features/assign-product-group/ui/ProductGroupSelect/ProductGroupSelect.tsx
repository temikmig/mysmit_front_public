import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  ClickAwayListener,
  Paper,
  Popper,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";

import { Loader } from "@shared/ui";

import {
  ProductGroupBadge,
  ProductGroupSelector,
} from "./ProductGroupSelect.styled";
import { useGetProductGroupsByServiceQuery } from "../../api";
import {
  ProductGroup,
  useAssignProductGroup,
  useDeleteProductGroup,
  useOpenProductGroupCreateModal,
  useOpenProductGroupEditModal,
} from "../../model";

interface ProductGroupSelectProps {
  productId: number;
  serviceId: number;
  group?: ProductGroup;
}

export const ProductGroupSelect: FC<ProductGroupSelectProps> = ({
  productId,
  serviceId,
  group,
}) => {
  const { data: groups = [], isLoading } =
    useGetProductGroupsByServiceQuery(serviceId);

  const createGroup = useOpenProductGroupCreateModal({ serviceId });
  const handleEditGroup = useOpenProductGroupEditModal();

  const handleDeleteGroup = async (groupId: number) => {
    await deleteProductGroup(groupId);
  };

  const { assignProductGroup, isLoading: isLoadingAssign } =
    useAssignProductGroup();

  const { deleteProductGroup, isLoading: isLoadingDelete } =
    useDeleteProductGroup();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openGroups = Boolean(anchorEl);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSelectGroup = async (groupId: number) => {
    setAnchorEl(null);

    await assignProductGroup({ productId, groupId });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = () => {
    setAnchorEl(null);
    createGroup();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <ProductGroupSelector
          size="medium"
          onClick={handleToggle}
          variant={group ? "contained" : "outlined"}
          endIcon={
            openGroups ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          groupColor={group ? group.color : undefined}
        >
          {group ? group.name : "Нет группы"}
        </ProductGroupSelector>

        <Popper
          open={openGroups}
          anchorEl={anchorEl}
          sx={{ zIndex: 9999 }}
          placement="bottom-end"
          modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
        >
          <Paper sx={{ p: 1, minWidth: 240 }}>
            {isLoading ? (
              <Loader />
            ) : (
              <Box display="flex" flexDirection="column" gap={1}>
                {groups.length > 0 && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    overflow="auto"
                    maxHeight={192}
                  >
                    {groups.map((group) => (
                      <Box display="flex" gap={1}>
                        <ProductGroupBadge
                          groupColor={group.color}
                          key={group.id}
                          onClick={() => handleSelectGroup(group.id)}
                          disabled={isLoadingAssign}
                        >
                          {group.name}
                        </ProductGroupBadge>
                        <IconButton onClick={() => handleEditGroup(group.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteGroup(group.id)}
                          disabled={isLoadingDelete}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
                <Button size="small" onClick={handleCreateGroup} fullWidth>
                  Создать группу
                </Button>
              </Box>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
