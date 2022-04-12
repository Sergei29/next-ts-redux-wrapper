import React from "react";
import Link, { LinkProps } from "next/link";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
} & LinkProps;

export const NextLink = ({
  children,
  ...restLinkProps
}: Props): JSX.Element => (
  <Link passHref {...restLinkProps}>
    <Box component="a" sx={{ textDecoration: "none" }}>
      {children}
    </Box>
  </Link>
);
