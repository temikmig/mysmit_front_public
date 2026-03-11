import { Components, Theme } from "@mui/material/styles";

import type {} from "@mui/x-data-grid/themeAugmentation";

export const getComponents = (theme: Theme): Components => ({
  MuiButton: {
    defaultProps: {
      variant: "contained",
      size: "large",
    },
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        textTransform: "none",
      },
    },
    variants: [
      {
        props: { variant: "contained" },
        style: {
          background: theme.palette.grey[900],
          borderBottom: `2px transparent solid`,
          "&:hover": {
            borderBottom: `2px ${theme.palette.primary.main} solid`,
          },
        },
      },
      {
        props: { variant: "outlined" },
        style: {
          borderColor: theme.palette.secondary.main,
          color: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: `rgba(${theme.palette.secondary.main}), 0.04)`,
          },
        },
      },
      {
        props: { variant: "text", color: "primary" },
        style: {
          color: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: `rgba(${theme.palette.secondary.main}), 0.04)`,
          },
        },
      },
    ],
  },

  MuiChip: {
    styleOverrides: {
      root: {
        fontSize: 12,
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        "& .MuiSvgIcon-root": {
          fontSize: 32,
        },
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "filled",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        overflow: "hidden",
        borderRadius: theme.shape.borderRadius,
        "& input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #4f4831 inset",
          WebkitTextFillColor: "#fff",
          transition: "background-color 5000s ease-in-out",
        },
        ...(ownerState.size === "small" && {
          "& .MuiInputBase-root": {
            height: 48,
          },
        }),
      }),
    },
  },

  MuiFilledInput: {
    styleOverrides: {
      root: {
        overflow: "hidden",
        borderRadius: theme.shape.borderRadius,
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontWeight: 400,

        "&.MuiInputLabel-shrink": {
          transform: "translate(12px, 4px) scale(0.7)",
        },
        "&.Mui-focused": {
          color: "#000",
          transform: "translate(18px, 4px) scale(0.7)",
        },
      },
    },
  },

  MuiInputAdornment: {
    styleOverrides: {
      root: {
        marginRight: theme.spacing(1),
      },
    },
  },

  MuiDataGrid: {
    defaultProps: {
      rowHeight: 64,
      getRowHeight: () => "auto",
      columnHeaderHeight: 40,
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
      row: {
        "&.Mui-selected": {
          backgroundColor: `transparent`,
          boxShadow: `0px 0px 15px 0px ${theme.palette.primary.main}`,
          "&:hover": {
            backgroundColor: theme.palette.grey[900],
          },
        },
        "&:hover": {
          backgroundColor: theme.palette.divider,
        },
        "&:active": {
          backgroundColor: "transparent",
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
      },
      footerContainer: {
        borderTop: "1px solid #3A3A3A",
        backgroundColor: "#2A2A2A",
        color: "#E0E0E0",
      },
      cell: {
        borderBottom: "1px solid #3A3A3A",
        padding: theme.spacing(1),
      },
      columnSeparator: {
        backgroundColor: "transparent",
      },
    },
  },

  MuiTablePagination: {
    defaultProps: {
      labelDisplayedRows: ({ from, to, count }) => `${from}–${to} из ${count}`,
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        fontSize: 16,
        cursor: "pointer",
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: "14px",
        zIndex: 99999999999999,
      },
    },
  },

  MuiFab: {
    styleOverrides: {
      primary: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.custom.white,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 300,
      },
    },
  },

  MuiDialog: {
    defaultProps: {
      fullWidth: true,
      maxWidth: "md",
      BackdropProps: {
        style: {
          backdropFilter: "blur(4px)",
        },
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: theme.shape.borderRadius,
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: theme.typography.h5.fontSize,
        fontWeight: 300,
        borderBottom: `1px ${theme.palette.custom.grey} solid`,
        padding: theme.spacing(2),
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
      },
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`,
        justifyContent: "flex-end",
      },
    },
  },
});
