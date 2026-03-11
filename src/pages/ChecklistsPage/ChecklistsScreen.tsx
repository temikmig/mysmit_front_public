import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  ChecklistMobileItem,
  useGetChecklistsListQuery,
} from "@entities/checklist";
import { useDebounce } from "@shared/lib";
import { Loader, MobilePaper } from "@shared/ui";
import { PageHeaderTabs } from "@shared/ui/page-header";

import {
  ChecklistsTab,
  ChecklistsTabEnum,
  useChecklistsPage,
  useChecklistsParams,
} from "./model";

export const ChecklistsScreen = () => {
  const [limit] = useState(20);

  const { params, tab, page, search, period, setTab, setPage, setSearch } =
    useChecklistsParams();

  const { tab: defaultTab, tabs, isLoading } = useChecklistsPage();

  const debouncedSearch = useDebounce(search, 300);

  const { data: dataChecklists, isLoading: isLoadingChecklists } =
    useGetChecklistsListQuery({
      page,
      limit,
      search: debouncedSearch,
      filters: {
        status: tab === ChecklistsTabEnum.ALL ? undefined : tab,
        month: period,
      },
    });

  useEffect(() => {
    if (!params.has("tab") && defaultTab !== ChecklistsTabEnum.ALL) {
      setTab(defaultTab);
    }
  }, [defaultTab]);

  if (isLoadingChecklists || isLoading) return <Loader />;

  return (
    <MobilePaper
      title={
        <PageHeaderTabs
          tabs={tabs}
          activeTab={tab}
          onTabChange={(v) => setTab(v as ChecklistsTab)}
        />
      }
    >
      <Paper
        sx={{
          padding: 2,
          margin: -2,
          borderRadius: 0,
          position: "sticky",
          top: -16,
        }}
      >
        <TextField
          size="small"
          label="Поиск"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Paper>
      <Box display="flex" flexDirection="column" gap={2} sx={{ paddingTop: 4 }}>
        {dataChecklists?.data?.map((c) => (
          <ChecklistMobileItem checklist={c} key={c.id} />
        ))}
      </Box>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Назад
        </Button>
        <Typography color="white">
          Страница {page} из {Math.ceil((dataChecklists?.total || 0) / limit)}
        </Typography>
        <Button
          disabled={page * limit >= (dataChecklists?.total || 0)}
          onClick={() => setPage(page + 1)}
        >
          Вперед
        </Button>
      </Stack>
    </MobilePaper>
  );
};
