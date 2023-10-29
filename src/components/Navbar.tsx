import {
  Box,
  Flex,
  Avatar,
  // Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

interface INav {
  isAuthen: boolean;
}

export const Nav = ({ isAuthen }: INav) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-z-50">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to={isAuthen === true ? "/main" : "/"}>
            <Box>Social-Media</Box>
          </Link>

          

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              {!isAuthen ? (
                <>
                  <Link to={"/login"}>
                    <Button
                      fontSize={"sm"}
                      fontWeight={400}
                      variant={"link"}
                      className="tw-mt-3"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to={"/register"}>
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"blue.400"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/main">
                    <Button
                      as={"a"}
                      fontSize={"lg"}
                      fontWeight={600}
                      variant={"link"}
                      className="tw-mt-2"
                    >
                      Main
                    </Button>
                  </Link>
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </>
              )}
              {isAuthen && (
                <>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("userInfo");
                          navigate("/");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};
