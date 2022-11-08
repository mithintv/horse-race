import { Box } from "@chakra-ui/react";
import { AppProps } from "../models/types";
import Footer from "./Footer";

export default function Layout(props: AppProps) {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <main>{props.children}</main>
      <Box justifySelf={"flex-end"}>
        <Footer />
      </Box>
    </Box>
  );
}
