import { styled } from '@mui/material/styles';

export const ShoppingCardStyled = styled('div')(({ theme }) => ({
    display: "flex",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 4,
    overflow: "auto",
    "& .wrap-prds": {
        display: "flex",
        flexDirection: "column",
        "& .prd-item": {
            display: "flex",
            flexDirection: "row",
            marginBottom: 8,
            borderBottom: "1px solid rgba(0,0,0,0.2)",
            padding: "8px 8px",
            "& .col1": {
                width: 60
            },
            "& .col1-desktop": {
                width: 160
            },
            "& .col2": {
                flex: 1,
                padding: 8,
            },
            "& .col2-desktop": {
                padding: "8px 32px",
            },
            "& .col3": {
                display: "flex",
                flexDirection: "column",
                "& .wrap-price": {
                    flex: 1,
                    textAlign: "right",
                    marginBottom: 32
                },
                "& .wrap-act": {
                    display: "flex",
                    "& .MuiOutlinedInput-root": {
                        "& input": {
                            textAlign: "center",
                            paddingRight: 4,
                            paddingLeft: 4
                        }
                    },
                    "& button": {
                        // padding: 0,
                        minWidth: "unset",
                        margin: "auto"
                    }
                }
            },
        }
    },

    "& .sum": {
        display: "flex",
        flexDirection: "column",
        padding: 8,
        "& .sum-top": {
            display: "flex",
            marginBottom: 16
        }
    },

    "& .no-data": {
        display: 'flex',
        flexDirection: "column",
        "& > *": {
            margin: "auto"
        },
        "& .MuiSvgIcon-root": {
            width: 56,
            height: 56,
            color: "#B32034"
        }
    }
}));

