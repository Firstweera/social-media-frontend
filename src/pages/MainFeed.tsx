import { Spinner, Box, VStack, Divider } from "@chakra-ui/react";
import { CreatePost, PostCard } from "../components";
import { useGetPosts } from "../hooks";

export const MainFeed = () => {
  const {
    data: allPost,
    refetch: refetchPost,
    isLoading: loadingPost,
  } = useGetPosts();

  return (
    <Box mt={20} p={5} w="full" maxW="10/12" mx="auto">
      <CreatePost refetchPost={refetchPost} />

      <Divider className="tw-my-5" />

      {loadingPost ? (
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
          {allPost?.data.map((item: any) => (
            <PostCard key={item.id} post={item} refetchPost={refetchPost} />
          ))}
        </VStack>
      )}
    </Box>
  );
};
