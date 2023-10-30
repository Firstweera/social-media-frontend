import { Box, Divider, Stack } from "@chakra-ui/react";
import { CreatePost, PostCard, UserCard } from "../components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useGetUserProfile } from "../hooks";

export const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const [dataProfile, setDataProfile] = useState<any>();
  const getProfile = useGetUserProfile();

  useEffect(() => {
    if (user?.profileMode.mode === "myProfile") {
      setDataProfile(userInfo);
    } else if (user?.profileMode.mode === "friendProfile") {
      const fetchData = async () => {
        try {
          const data = await getProfile.mutateAsync(
            user.profileMode.userId as unknown as number
          );
          setDataProfile(data.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // Handle the error as needed.
        }
      };
      fetchData();
    }
  }, [user?.profileMode.mode, user?.profileMode.userId]);

  return (
    <>
      <Box
        mt={20}
        p={5}
        w="full"
        maxW="10/12"
        mx="auto"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack spacing={8} direction="row">
          <UserCard dataProfile={dataProfile} mode={user?.profileMode.mode} />

          <Box>
            <CreatePost />
            <Divider className="tw-my-5"/>
            <PostCard />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
