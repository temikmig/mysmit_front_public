import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper elevation={8}>
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        sx={{
          height: 72,
          bgcolor: "#333232",
        }}
      >
        <BottomNavigationAction
          label="Чек-листы"
          value="/m/checklists"
          icon={<ChecklistIcon sx={{ fontSize: 28 }} />}
        />

        <BottomNavigationAction
          label="Создать"
          value="/m/create-checklist"
          icon={<AddCircleIcon sx={{ fontSize: 32 }} />}
        />

        <BottomNavigationAction
          label="Зарплата"
          value="/m/salary"
          icon={<PaymentsIcon sx={{ fontSize: 28 }} />}
        />

        <BottomNavigationAction
          label="Профиль"
          value="/m/profile"
          icon={<PersonIcon sx={{ fontSize: 28 }} />}
        />
      </BottomNavigation>
    </Paper>
  );
};
