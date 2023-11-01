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
  const token = localStorage.getItem("token");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      mb={10}
      pos={"fixed"}
      top={0}
      left={0}
      w="full"
      zIndex={50}
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        position={"relative"}
      >
        <Link to={user?.isAuthen ? "/main" : "/"}>
          <Box>Social-Media</Box>
        </Link>

        {user?.isAuthen && (
          <Box
            maxW="sm"
            mt={3}
            zIndex={40}
            // insetY={20}
            inset={0}
            // right={0}
            left={{ base: "36", sm: "48", md: "56", lg: "72" }}
            pos={"absolute"}
            width={[
              "30%", // 62em+
              "50%", // 48em-62em
              // "50%", // 30em-48em
              // "60%", // 0-30em
            ]}
            // className="tw-border-2 tw-border-green-400 tw-left-"
          >
            <SearchBar />
          </Box>
        )}

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            {!user?.isAuthen ? (
              <>
                <Button
                  as={"a"}
                  fontSize="sm"
                  fontWeight={400}
                  variant="link"
                  href="/about"
                >
                  About
                </Button>

                <Button
                  as={"a"}
                  fontSize="sm"
                  fontWeight={400}
                  variant="link"
                  href="/login"
                >
                  Sign In
                </Button>

                <Button
                  // display={{ base: "none", md: "inline-flex" }}
                  as={"a"}
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="blue.400"
                  _hover={{
                    bg: "blue.500",
                  }}
                  href="/register"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Stack direction="row" spacing={7}>
                  <Box display={{ base: "none", md: "none", lg: "block" }}>
                    <Stack direction="row" spacing={7}>
                      <Button
                        as={"a"}
                        fontSize="lg"
                        fontWeight={600}
                        variant="link"
                        display={{ base: "none", md: "inline-flex" }}
                        mt={2}
                        onClick={() => {
                          setUser({
                            isAuthen: !!token,
                            profileMode: {
                              mode: "myProfile",
                              userId: userInfo?.userId,
                            },
                          });
                        }}
                        href="/profile"
                      >
                        Profile
                      </Button>

                      <Button
                        as={"a"}
                        fontSize="lg"
                        fontWeight={600}
                        variant="link"
                        mt={2}
                        display={{ base: "none", md: "inline-flex" }}
                        href="/main"
                      >
                        Main
                      </Button>
                    </Stack>
                  </Box>

                  <Button onClick={toggleColorMode} display={"inline-flex"}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Stack>
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
                  <Flex direction="column" alignItems="center">
                    <Avatar
                      size="xl"
                      name="userAvatar"
                      src={
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                      }
                    />
                    <Text>
                      {userInfo?.firstName} {userInfo?.lastName}
                    </Text>
                  </Flex>
                  <MenuDivider />
                  <Box display={["block", "block", "none"]}>
                    <MenuItem
                      onClick={() => {
                        setUser({
                          isAuthen: !!token,
                          profileMode: {
                            mode: "myProfile",
                            userId: userInfo?.userId || 0,
                          },
                        });
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUser({
                          isAuthen: !!token,
                          profileMode: {
                            mode: "myProfile",
                            userId: userInfo?.userId || 0,
                          },
                        });
                        navigate("/main");
                      }}
                    >
                      Main
                    </MenuItem>
                  </Box>
                  <MenuItem
                    onClick={() => {
                      setUser({
                        isAuthen: !!token,
                        profileMode: {
                          mode: "myProfile",
                          userId: userInfo?.userId || 0,
                        },
                      });
                      navigate("/profile");
                    }}
                  >
                    Account Settings
                  </MenuItem>
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
                            "=;expires=" + new Date().toUTCString() + ";path=/"
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
  );
};
