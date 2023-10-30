import { useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from ".";
import { UserContext } from "../App";

export const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-z-50">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link to={user?.isAuthen ? "/main" : "/"}>
            <Box>Social-Media</Box>
          </Link>

          {user?.isAuthen && (
            <Flex>
              <SearchBar />
            </Flex>
          )}

          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              {!user?.isAuthen ? (
                <>
                  <Link to="/login">
                    <Button
                      fontSize="sm"
                      fontWeight={400}
                      variant="link"
                      mt={3}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize="sm"
                      fontWeight={600}
                      color="white"
                      bg="blue.400"
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
                  <Link to="/profile">
                    <Button
                      fontSize="lg"
                      fontWeight={600}
                      variant="link"
                      mt={2}
                      onClick={() => {
                        setUser({
                          isAuthen: user?.isAuthen,
                          profileMode: {
                            mode: "myProfile",
                            userId: userInfo?.userId,
                          },
                        });
                      }}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Link to="/main">
                    <Button
                      fontSize="lg"
                      fontWeight={600}
                      variant="link"
                      mt={2}
                    >
                      Main
                    </Button>
                  </Link>
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </>
              )}

              {user?.isAuthen && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar
                      size="sm"
                      name="userAvatar"
                      src={
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems="center">
                    <Center>
                      <Avatar
                        size="xl"
                        name="userAvatar"
                        src={
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                        }
                      />
                    </Center>
                    <Center>
                      <Text>
                        {userInfo?.firstName} {userInfo?.lastName}
                      </Text>
                    </Center>
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem
                      onClick={() => {
                        // Clear local storage
                        window.localStorage.clear();

                        // Clear session storage
                        window.sessionStorage.clear();

                        // Clear all cookies
                        document.cookie.split(";").forEach(function (c) {
                          document.cookie = c
                            .replace(/^ +/, "")
                            .replace(
                              /=.*/,
                              "=;expires=" +
                                new Date().toUTCString() +
                                ";path=/"
                            );
                        });

                        setUser({
                          isAuthen: false,
                          profileMode: {
                            mode: "myProfile",
                            userId: userInfo?.userId || 0,
                          },
                        });
                        navigate("/");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};
