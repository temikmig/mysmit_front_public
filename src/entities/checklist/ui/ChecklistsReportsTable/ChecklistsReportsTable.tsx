import { Table, TableHead, TableBody, TableFooter } from "@mui/material";
import { FC } from "react";

import {
  ChecklistReportItem,
  ChecklistReportSums,
} from "@entities/checklist/model";
import { useOpenChecklistCardModal } from "@features/checklist";

import { ChecklistReportsTableContainer } from "./ChecklistReportsTable.styled";
import { ChecklistsTableFooter } from "./ChecklistsTableFooter";
import { ChecklistsTableHead } from "./ChecklistsTableHead";
import { ChecklistsTableRowItem } from "./ChecklistsTableRowItem";

interface ChecklistsTableProps {
  checklists: ChecklistReportItem[];
  total: number;
  sums: ChecklistReportSums;
  sortColumn: keyof ChecklistReportItem;
  changeSortColumn?: (sortColumn: keyof ChecklistReportItem) => void;
}

export const ChecklistsTable: FC<ChecklistsTableProps> = ({
  checklists,
  total,
  sums,
  sortColumn,
  changeSortColumn,
}) => {
  const openChecklist = useOpenChecklistCardModal();

  return (
    <ChecklistReportsTableContainer>
      <Table>
        <TableHead>
          <ChecklistsTableHead
            sortColumn={sortColumn}
            changeSortColumn={changeSortColumn}
          />
        </TableHead>
        {checklists.length > 0 ? (
          <>
            <TableBody>
              {checklists.map((cl) => (
                <ChecklistsTableRowItem
                  key={cl.id}
                  checklist={cl}
                  openChecklist={openChecklist}
                />
              ))}
            </TableBody>
            <TableFooter>
              <ChecklistsTableFooter total={total} sums={sums} />
            </TableFooter>
          </>
        ) : (
          <tr>
            <td colSpan={17} style={{ textAlign: "center", padding: 16 }}>
              Информация отсутствует
            </td>
          </tr>
        )}
      </Table>
    </ChecklistReportsTableContainer>
  );
};
