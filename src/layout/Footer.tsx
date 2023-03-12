import { Wrap } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Wrap m={10} justify={"center"}>
      <p>Made with love by Mithin Thomas &copy;{new Date().getFullYear()}</p>
    </Wrap>
  );
}
