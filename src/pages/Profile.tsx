import { Box, Divider, Spinner, Stack, VStack } from "@chakra-ui/react";
import { CreatePost, PostCard, UserCard } from "../components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import {
  useGetPostsUser,
  useGetPostsUserId,
  useGetUserProfile,
} from "../hooks";
import dayjs from "dayjs";
import { useFollowUser, useUnFollowUser } from "../hooks";

export const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const [dataProfile, setDataProfile] = useState<any>();
  const getProfile = useGetUserProfile();
  const {
    data: allPostUser,
    refetch: refetchPostUser,
    isLoading: loadingPostUser,
  } = useGetPostsUser();
  const {
    data: allPostUserId,
    refetch: refetchPostUserId,
    isLoading: loadingPostUserId,
  } = useGetPostsUserId(user.profileMode.userId);
  const followUserMutation = useFollowUser();
  const unFollowUserMutation = useUnFollowUser();
  const [reloadData, setReloadData] = useState<Boolean>(false);

  console.log("userInfo", userInfo);
  console.log("user", user);

  const fetchData = async (userId: number) => {
    try {
      const data = await getProfile.mutateAsync(userId);
      const { fname, lname, id, follows, toFollows } = data?.data || {};
      setDataProfile({
        firstName: fname,
        lastName: lname,
        userId: id,
        follows: follows,
        toFollows: toFollows,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (user?.profileMode.mode === "myProfile") {
      if (userInfo) {
        fetchData(userInfo.userId);
      }
    } else if (user?.profileMode.mode === "friendProfile") {
      if (user.profileMode.userId) {
        fetchData(user.profileMode.userId as unknown as number);
        refetchPostUserId(user.profileMode.userId);
      }
    }
  }, [user?.profileMode.mode, user?.profileMode.userId, reloadData]);

  const handleFollowUser = async (friendId: number, type: string) => {
    try {
      if (type === "follow") {
        const result = await followUserMutation.mutateAsync({ friendId });
        if (result.status === "ok") {
          setReloadData(true);
        }
      } else if (type === "unFollow") {
        const result = await unFollowUserMutation.mutateAsync({ friendId });
        if (result.status === "ok") {
          setReloadData(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Stack
        mt={20}
        p={5}
        w="full"
        maxW="10/12"
        mx="auto"
        // justifyItems="center"
        alignItems="center"
        display={{ sm: "row", md: "row", lg: "flex" }}
        gap={3}
      >
        {/* <Stack spacing={8} direction="row"> */}
        <Stack mb={5} alignItems="center" w="full" maxW="10/12">
          <UserCard
            dataProfile={dataProfile}
            mode={user?.profileMode.mode}
            handleFollowUser={handleFollowUser}
            setReloadData={setReloadData}
          />
        </Stack>

        <Box>
          {user?.profileMode.mode === "myProfile" ? <CreatePost /> : null}
          <Divider className="tw-my-5" />
          {loadingPostUser || loadingPostUserId ? (
            <Box display="flex" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.400"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            <VStack spacing={5}>
              {user?.profileMode.mode === "myProfile" ? (
                <>
                  {allPostUser?.data
                    .sort((a: any, b: any) =>
                      dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1
                    )
                    .map((item: any) => (
                      <PostCard
                        key={item.id}
                        post={item}
                        refetchPostUser={refetchPostUser}
                        refetchPostUserId={refetchPostUserId}
                      />
                    ))}
                </>
              ) : (
                <>
                  {allPostUserId?.data
                    .sort((a: any, b: any) =>
                      dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1
                    )
                    .map((item: any) => (
                      <PostCard
                        key={item.id}
                        post={item}
                        refetchPostUser={refetchPostUser}
                        refetchPostUserId={refetchPostUserId}
                      />
                    ))}
                </>
              )}
            </VStack>
          )}
        </Box>
        {/* </Stack> */}
      </Stack>
    </>
  );
};
