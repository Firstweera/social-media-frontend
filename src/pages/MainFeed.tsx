import { Spinner, Box, VStack, Divider } from "@chakra-ui/react";
import { CreatePost, PostCard } from "../components";
import { useGetPostsFollowing, useGetPostsUser } from "../hooks";
import dayjs from "dayjs";

export const MainFeed = () => {
  const {
    data: allPostUser,
    refetch: refetchPostUser,
    isLoading: loadingPostUser,
  } = useGetPostsUser();
  const {
    data: allPostFollow,
    refetch: refetchPostFollow,
    isLoading: loadingPostFollow,
  } = useGetPostsFollowing();

  let allPost: any[] = [];

  if (allPostUser?.data && Array.isArray(allPostUser.data)) {
    allPost = [...allPost, ...allPostUser.data];
  }

  if (allPostFollow?.data && Array.isArray(allPostFollow.data)) {
    allPost = [...allPost, ...allPostFollow.data];
  }

  console.log("allPostUser", allPostUser);
  console.log("allPostFollow", allPostFollow);
  console.log(
    "allPost",
    allPost.sort((a, b) => a.updatedAt - b.updatedAt)
  );

  return (
    <Box mt={20} p={5} w="full" maxW="10/12" mx="auto">
      <CreatePost
        refetchPostUser={refetchPostUser}
        refetchPostFollow={refetchPostFollow}
      />

      <Divider className="tw-my-5" />

      {loadingPostUser || loadingPostFollow ? (
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
          {allPost
            .sort((a, b) =>
              dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1
            )
            .map((item: any) => (
              <PostCard
                key={item.id}
                post={item}
                refetchPostUser={refetchPostUser}
                refetchPostFollow={refetchPostFollow}
              />
            ))}
        </VStack>
      )}
    </Box>
  );
};
