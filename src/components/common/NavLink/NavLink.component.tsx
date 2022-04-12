import React from "react";
import Link, { LinkProps } from "next/link";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export const NavLink: React.FC<LinkProps> = ({
  children,
  ...restLinkProps
}) => {
  const { pathname } = useRouter();
  const isActive = pathname === restLinkProps.href;

  return (
    <Link passHref {...restLinkProps}>
      <Box
        component="a"
        sx={{
          color: (theme) => theme.text.main,
          textDecoration: "none",
          fontWeight: isActive ? 600 : 400,
          cursor: "pointer",
          mx: "16px",
        }}
      >
        {children}
      </Box>
    </Link>
  );
};
