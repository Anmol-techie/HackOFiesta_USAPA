import React, { lazy, Suspense, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, ListItem, IconButton } from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/styles";
import { motion } from "framer-motion";
import { pages, adminPages } from "../../routes";
import { useAuth } from "../../context/AuthContext";

const Logo = lazy(() => import("../../assets/Stockit"));

export const NAVBAR_WIDTH = 72;
export const EXPANDED_NAVBAR_WIDTH = 288;

const useNavbarStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    overflowX: "hidden",
    position: "fixed",
    zIndex: theme.zIndex.appBar,
  },
  Item: {
    display: "flex",
    flexDirection: "row",
    textDecoration: "none",
    justifyContent: "unset",
    transition: theme.transitions.create("color"),
  },
  ItemIcon: {
    width: NAVBAR_WIDTH,
    height: 64,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemText: {
    display: "flex",
    flexShrink: 0,
    width: EXPANDED_NAVBAR_WIDTH - NAVBAR_WIDTH,
    alignItems: "center",
    fontSize: "1.15em",
    paddingLeft: 12,
    paddingRight: 12,
  },
  LargeItemText: {
    fontSize: "2.5em",
  },
  ButtonText: {
    fontWeight: 400,
  },
}));

const MotionBox = motion(Box);
const MotionListItem = motion(ListItem);
const MotionTypography = motion(Typography);

const Navbar = memo(({ admin }) => {
  const styles = useNavbarStyles();
  const theme = useTheme();
  const location = useLocation();
  const logout = useAuth((state) => state.logout);

  const { navbarMotion, itemMotion, iconMotion, textMotion } = useMemo(
    () => ({
      navbarMotion: {
        initial: "hidden",
        animate: location.pathname === "/welcome" ? "hidden" : "normal",
        whileHover: "expanded",
        variants: {
          hidden: {
            opacity: 0,
            width: NAVBAR_WIDTH,
          },
          normal: {
            opacity: 1,
            width: NAVBAR_WIDTH,
            boxShadow: theme.shadows[1],
          },
          expanded: {
            width: EXPANDED_NAVBAR_WIDTH,
            boxShadow: theme.shadows[2],
          },
        },
        transition: {
          duration: theme.transitions.duration.short / 1000,
          easing: theme.transitions.easing.sharp,
        },
      },
      itemMotion: {
        variants: {
          normal: { color: theme.palette.text.primary },
          focused: { color: theme.palette.primary.main },
        },
        transition: {
          duration: theme.transitions.duration.shortest / 1000,
          easing: theme.transitions.easing.sharp,
        },
      },
      textMotion: {
        variants: {
          normal: { color: theme.palette.text.primary },
          focused: { color: theme.palette.primary.main, fontWeight: 700 },
        },
        transition: {
          duration: theme.transitions.duration.shortest / 1000,
          easing: theme.transitions.easing.sharp,
        },
      },
      iconMotion: {
        initial: "hidden",
        animate: "visible",
        variants: {
          visible: (i = 0) => ({
            opacity: 1,
            translateY: 0,
            transition: {
              delay: i * 0.3,
            },
          }),
          hidden: { opacity: 0, translateY: 24 },
        },
      },
    }),
    [theme, location.pathname]
  );

  return (
    <MotionBox {...navbarMotion} classes={{ root: styles.Container }}>
      <ListItem disableGutters>
        <MotionBox {...iconMotion} classes={{ root: styles.ItemIcon }}>
          <Suspense fallback={<div />}>
            <Logo
              style={{
                height: NAVBAR_WIDTH - 32,
                width: NAVBAR_WIDTH - 32,
              }}
            />
          </Suspense>
        </MotionBox>
        <Typography
          classes={{ root: [styles.ItemText, styles.LargeItemText].join(" ") }}
          style={{ fontWeight: 600, fontFamily: "monospace" }}
        >
          stock-it
        </Typography>
      </ListItem>
      {admin
        ? adminPages.map((page, i) =>
            page.showInNavbar === true ? (
              <MotionListItem
                button
                dense
                disableGutters
                {...itemMotion}
                animate={
                  location.pathname === page.pageLink ? "focused" : "normal"
                }
                component={Link}
                classes={{ root: styles.Item }}
                to={page.pageLink}
                key={page.pageLink}
              >
                <MotionBox
                  custom={i + 1}
                  {...iconMotion}
                  classes={{ root: styles.ItemIcon }}
                >
                  <page.navbarIcon style={{ fontSize: 28 }} />
                </MotionBox>
                <MotionTypography
                  variant="button"
                  {...textMotion}
                  animate={
                    location.pathname === page.pageLink ? "focused" : "normal"
                  }
                  classes={{
                    root: [styles.ItemText, styles.ButtonText].join(" "),
                  }}
                >
                  {page.displayName}
                </MotionTypography>
              </MotionListItem>
            ) : null
          )
        : pages.map((page, i) =>
            page.showInNavbar === true ? (
              <MotionListItem
                button
                dense
                disableGutters
                {...itemMotion}
                animate={
                  location.pathname === page.pageLink ? "focused" : "normal"
                }
                component={Link}
                classes={{ root: styles.Item }}
                to={page.pageLink}
                key={page.pageLink}
              >
                <MotionBox
                  custom={i + 1}
                  {...iconMotion}
                  classes={{ root: styles.ItemIcon }}
                >
                  <page.navbarIcon style={{ fontSize: 28 }} />
                </MotionBox>
                <MotionTypography
                  variant="button"
                  {...textMotion}
                  animate={
                    location.pathname === page.pageLink ? "focused" : "normal"
                  }
                  classes={{
                    root: [styles.ItemText, styles.ButtonText].join(" "),
                  }}
                >
                  {page.displayName}
                </MotionTypography>
              </MotionListItem>
            ) : null
          )}
      <Box position="fixed" bottom={12} left={NAVBAR_WIDTH / 4 - 6}>
        <IconButton onClick={logout}>
          <ExitToAppOutlined />
        </IconButton>
      </Box>
    </MotionBox>
  );
});

export default Navbar;
