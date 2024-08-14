import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/store/action/auth-action/auth-action";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import settings from "../../../src/assets/Group 4538@3x.png";
import employee from "../../../src/assets/Path 7517@3x.png";
import leave from "../../../src/assets/Group 4539@3x.png";
import logout from "../../../src/assets/Path 7523@3x.png";
import project from "../../../src/assets/Group 4540@3x.png";
import Attendance from "../../../src/assets/Attendence.png";
import Reports from "../../../src/assets/Reports.png";
import Engaegment from "../../../src/assets/Self Engagement.png";
import Subtask from "../../../src/assets/Sub Task.png";
import { useSnackbar } from "react-simple-snackbar";
import { snackbarOptions } from "../../do-not-repeat/do-not-repeat";
import client_dashboard from "../../../src/assets/Client Dashboard Yellow.png";
import ticket_list from "../../../src/assets/ticket_list.png";
import admin_dashboard from "../../../src/assets/Admin Dashboard Yellow.png";
import employee_dashboard from "../../../src/assets/Employee Dashboard Yellow.png";

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#1f487c",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: "#1f487c",
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    color: "#1f487c",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const SubItemContainer = styled("ul")(({ theme }) => ({
    paddingLeft: theme.spacing(10),
    listStyleType: "disc",
    "& li::marker": {
        color: "#ffba21",
    },
}));

const SubItem = styled(NavLink)(({ theme, active }) => ({
    color: active ? "#ffba21" : "#fff",
    padding: "2px 0",
    cursor: "pointer",
    textDecoration: "none",
    "&.active": {
        color: "#ffba21",
    },
}));

const adminItems = [
    // Define your adminItems array
    {
        text: "Dashboard",
        image: admin_dashboard,
        subItems: [{ text: "Admin Dashboard", route: "/adminDashboard" }],
    },
    {
        text: "Employee",
        image: employee,
        subItems: [
            { text: "List Of Employees", route: "/employee-list" },
            { text: "Employee Attendance", route: "/attendence-screen-list" },
            { text: "Allocation Status", route: "/allocation-status" },
        ],
    },
    {
        text: "Leave",
        image: leave,
        subItems: [
            { text: "Period", route: "/PeriodScreen" },
            { text: "Leave Type", route: "/add-leave-type" },
            { text: "Holiday", route: "/holiday-list" },
            { text: "Leave Assignment", route: "/leave-assign-list" },
        ],
    },
    {
        text: "Project",
        image: project,
        subItems: [
            { text: "Project", route: "/project-list" },
            { text: "Task", route: "/task-list" },
            { text: "Task Assignment", route: "/task-assignment" },
            { text: "Employee Assignment", route: "/employee-assignment" },
            { text: "Engagement Report", route: "/engagement-report" },
        ],
    },
    {
        text: "Client & Location",
        image: settings,
        subItems: [
            { text: "Client", route: "/client-list" },
            { text: "Location", route: "/location-list" },
            { text: "Client Location Report", route: "/Client_location_Report" },
        ],
    },
];

const employeeItems = [
    // Define your employeeItems array
    {
        text: "Dashboard",
        image: employee_dashboard,
        subItems: [{ text: "Employee Dashboard", route: "/employeeDashboard" }],
    },
    {
        text: "Subtask",
        image: Subtask,
        subItems: [{ text: "Subtask List", route: "/sub-task-list" }],
    },
    {
        text: "Reports",
        image: Reports,
        subItems: [
            { text: "Leave Request", route: "/LeaveRequestList" },
            { text: "Leave Approval", route: "/leave-approval-list" },
        ],
    },
    {
        text: "Engagement",
        image: Engaegment,
        subItems: [
            { text: "Self Engagement List", route: "/engagement-list" },
            { text: "Engagement Approval", route: "/engagement-approval-list" },
        ],
    },
    {
        text: "Attendance",
        image: Attendance,
        subItems: [
            { text: "Attendance List", route: "/employee-attendence-list" },
            { text: "Mark Attendance", route: "/employee-attendence-screen" },
        ],
    },
];

const clientItems = [
    // Define your clientItems array
    {
        text: "Dashboard",
        image: client_dashboard,
        subItems: [{ text: "Client Dashboard", route: "/clientDashboard" }],
    },
    {
        text: "Ticket",
        image: ticket_list,
        subItems: [{ text: "Ticket List", route: "/ticket-list" }],
    },
];

export const SideNav2 = ({ open, handleDrawerToggle }) => {
    const theme = useTheme();
    const { identityStatus } = useSelector(({ authStates }) => authStates);
    const [activeItem, setActiveItem] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useSnackbar(snackbarOptions);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (index) => {
        setActiveItem(activeItem === index ? null : index);

        if (!open) {
            handleDrawerToggle();
        }
    };

    const LoggedOut = () => {
        dispatch(Logout());
        navigate("/");
        openSnackbar("Logout Successfully");
    };

    let items;
    if (identityStatus === "admin") {
        items = adminItems;
    } else if (identityStatus === "client") {
        items = clientItems;
    } else if (identityStatus === "employee") {
        items = employeeItems;
    } else {
        items = [];
    }

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton sx={{ color: "#ffba21" }} onClick={handleDrawerToggle}>
                    {theme.direction === "rtl" ? (
                        open ? (
                            <ChevronRightIcon fontSize="large" />
                        ) : (
                            <ChevronLeftIcon fontSize="large" />
                        )
                    ) : open ? (
                        <ChevronLeftIcon fontSize="large" />
                    ) : (
                        <ChevronRightIcon fontSize="large" />
                    )}
                </IconButton>
            </DrawerHeader>

            <List sx={{ pt: 0 }}>
                {items.map((item, index) => {
                    const isActive = item.subItems.some(subItem =>
                        location.pathname === subItem.route
                    );
                    return (
                        <Box key={item.text}>
                            <ListItem
                                disablePadding
                                sx={{
                                    display: "block",
                                    backgroundColor: isActive ? "#ffba21" : "transparent",
                                }}
                                onClick={() => handleClick(index)}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                        color: "#fff",
                                    }}
                                >
                                    <img src={item.image} alt={item.text} />
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            opacity: open ? 1 : 0,
                                            paddingLeft: "10px",
                                            fontWeight: "bold",
                                            color: isActive ? "#1f487c" : "#fff",
                                        }}
                                    />
                                    {item.subItems && (
                                        <>
                                            {activeItem === index ? (
                                                <ExpandLess sx={{ color: "#fff" }} />
                                            ) : (
                                                <ExpandMore sx={{ color: "#fff" }} />
                                            )}
                                        </>
                                    )}
                                </ListItemButton>
                            </ListItem>

                            {item.subItems && (
                                <Collapse in={activeItem === index} timeout="auto" unmountOnExit>
                                    <SubItemContainer>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <ListItem key={subIndex}>
                                                <SubItem to={subItem.route}>
                                                    {subItem.text}
                                                </SubItem>
                                            </ListItem>
                                        ))}
                                    </SubItemContainer>
                                </Collapse>
                            )}
                        </Box>
                    );
                })}
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                        onClick={LoggedOut}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            color: "#fff",
                        }}
                    >
                        <img src={logout} alt="logout" />
                        <ListItemText
                            primary="Logout"
                            sx={{
                                opacity: open ? 1 : 0,
                                paddingLeft: "10px",
                                fontWeight: "bold",
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};
