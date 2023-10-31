import {
  Box,
  useColorModeValue,
  Image,
  Flex,
  Avatar,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { PopoverForm } from ".";
interface IUserCard {
  dataProfile: any;
  mode: string;
  handleFollowUser: (friendId: number, type: string) => Promise<void>;
  setReloadData: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const UserCard = ({
  dataProfile,
  mode,
  handleFollowUser,
  setReloadData,
}: IUserCard) => {
  console.log("dataProfile", dataProfile);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  function formatDataLength(num: number) {
    if (typeof num === "number") {
      if (num >= 1000) {
        return num / 1000 + "K";
      } else {
        return num.toString();
      }
    } else {
      return "";
    }
  }

  return (
    <>
      <Box
        maxW={"1000px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack
            direction={"row"}
            justify={"center"}
            spacing={2}
            align={"center"}
            mb={5}
          >
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {dataProfile?.firstName} {dataProfile?.lastName}
            </Heading>
            {/* <Text color={"gray.500"}>Frontend Developer</Text> */}
            {mode === "myProfile" ? (
              <PopoverForm dataProfile={dataProfile} />
            ) : null}
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>
                {formatDataLength(dataProfile?.toFollows.length)}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Following
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>
                {formatDataLength(dataProfile?.follows.length)}
              </Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack>

          {mode === "myProfile" ? null : (
            <>
              {dataProfile?.follows.filter(
                (item: any) => item.id === userInfo.userId
              ).length === 1 ? (
                <>
                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("#151f21", "gray.900")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={() => {
                      setReloadData(false);
                      handleFollowUser(dataProfile?.userId, "unFollow");
                    }}
                  >
                    Un follow
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("#151f21", "gray.900")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={() => {
                      setReloadData(false);
                      handleFollowUser(dataProfile?.userId, "follow");
                    }}
                  >
                    Follow
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
