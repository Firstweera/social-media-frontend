import { BiChat, BiLike, BiSolidLike } from "react-icons/bi";
import dayjs from "dayjs";
import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  // Textarea,
  Input,
  Divider,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Textarea,
  HStack,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineCreate } from "react-icons/md";
import {
  useCreateComment,
  useLikePost,
  useUnLikePost,
  useUpdatePost,
} from "../hooks";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ModalWarning } from ".";
import React from "react";

interface IPostCard {
  post?: any;
  refetchPostUser?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  refetchPostFollow?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  refetchPostUserId?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

export const PostCard = ({
  post,
  refetchPostUser,
  refetchPostFollow,
  refetchPostUserId,
}: IPostCard) => {
  const createCommentMutation = useCreateComment();
  const updatePostMutation = useUpdatePost();
  const likePostMutation = useLikePost();
  const unLikePostMutation = useUnLikePost();
  const localISOString = dayjs(post?.updatedAt).format("MMM DD, YYYY · HH:mm");
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const [toggleComment, setToggleComment] = useState<boolean>();
  const [commentData, setCommentData] = useState<any>({
    postId: post?.id,
    message: "",
  });
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [messageInPost, setMessageInPost] = useState<string>(post?.message);
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  // const [loadingLike, setLoadingLike] = useState<boolean>(false);

  const handleUpdatePost = async () => {
    if (messageInPost) {
      await updatePostMutation.mutateAsync({
        postId: post.id,
        message: messageInPost,
      });
      setMessageInPost(messageInPost);
      setToggleEdit(false);
      refetchPostUser && refetchPostUser();
      refetchPostFollow && refetchPostFollow();
    }
  };

  const handleCreateComment = async () => {
    if (commentData) {
      await createCommentMutation.mutateAsync(commentData);
      setCommentData({ postId: commentData?.postId, message: "" });
      refetchPostUser && refetchPostUser();
      refetchPostFollow && refetchPostFollow();
      refetchPostUserId && refetchPostUserId();
      setToggleComment(false);
    }
  };

  const handleLikePost = async (postId: number, type: string) => {
    // setLoadingLike(true);
    try {
      if (type === "like") {
        const result = await likePostMutation.mutateAsync({ postId });
        if (result.status === "ok") {
          refetchPostUser && refetchPostUser();
          refetchPostFollow && refetchPostFollow();
          refetchPostUserId && refetchPostUserId();
          // setTimeout(() => {
          //   setLoadingLike(false);
          // }, 500);
          console.log("Liked post:", result);
        }
      } else if (type === "unLike") {
        const result = await unLikePostMutation.mutateAsync({ postId });
        if (result.status === "ok") {
          refetchPostUserId && refetchPostUserId();
          refetchPostUser && refetchPostUser();
          refetchPostFollow && refetchPostFollow();
          // setTimeout(() => {
          //   setLoadingLike(false);
          // }, 500);
          console.log("UnLiked post:", result);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // console.log("post", post);
  // console.log("localISOString", localISOString);

  return (
    <>
      <Center py={3}>
        <ModalWarning
          isOpen={isOpen}
          onClose={onClose}
          overlay={overlay}
          postId={post?.id}
          refetchPostUser={refetchPostUser}
          refetchPostFollow={refetchPostFollow}
        />

        <Box
          maxW={"1200px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Flex justifyContent={"space-between"}>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Avatar
                  src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>
                    {post?.user.fname} {post?.user.lname}
                  </Text>
                  <Text color={"gray.500"}>{localISOString}</Text>
                </Stack>
              </Stack>

              {post?.userId === userInfo?.userId && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<EditIcon />}
                      onClick={
                        () => setToggleEdit(!toggleEdit)
                        // handleEditClick(post?.id, post?.message)
                      }
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setOverlay(<OverlayOne />);
                        onOpen();
                      }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>
            <div className="tw-w-[300px] sm:tw-w-[500px] md:tw-w-[600px] lg:tw-w-[1000px]">
              {toggleEdit ? (
                <>
                  <Textarea
                    value={messageInPost}
                    color={"gray.500"}
                    onChange={(e) => setMessageInPost(e.target.value)}
                  />
                  <HStack justify={"end"}>
                    <Button
                      size="sm"
                      mt={2}
                      // variant="ghost"
                      leftIcon={<MdOutlineCreate />}
                      onClick={() => handleUpdatePost()}
                      // isDisabled={message.length === 0}
                    >
                      Edit Post
                    </Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Text color={"gray.500"}>{messageInPost}</Text>
                </>
              )}
            </div>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              {post?.likes.filter(
                (item: any) => item.userId === userInfo.userId
              ).length === 1 ? (
                <>
                  <Button
                    size="sm"
                    flex="1"
                    variant="ghost"
                    // isLoading={loadingLike}
                    onClick={() => handleLikePost(post?.id, "unLike")}
                    leftIcon={<BiSolidLike />}
                  >
                    Like ({post?.likes.length})
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    flex="1"
                    variant="ghost"
                    // isLoading={loadingLike}
                    onClick={() => handleLikePost(post?.id, "like")}
                    leftIcon={<BiLike />}
                  >
                    Like ({post?.likes.length})
                  </Button>
                </>
              )}
              <Button
                size="sm"
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
                onClick={() => setToggleComment(!toggleComment)}
              >
                Comment ({post?.commentPosts.length})
              </Button>
            </Stack>
          </Stack>
          <Stack direction={"column"} spacing={1} fontSize={"sm"}>
            <Divider className="tw-mt-2" />
            {toggleComment && (
              <div className="tw-mt-2 tw-flex tw-justify-between tw-space-x-2">
                <Input
                  value={commentData?.message}
                  placeholder="Write a comment..."
                  onChange={(e) =>
                    setCommentData({ ...commentData, message: e.target.value })
                  }
                  size="sm"
                />

                <Button
                  size="sm"
                  variant="ghost"
                  leftIcon={<MdOutlineCreate />}
                  onClick={() => handleCreateComment()}
                  isDisabled={commentData?.message.length === 0}
                >
                  Comment
                </Button>
              </div>
            )}
            {post?.commentPosts.length > 0 ? (
              <>
                {post?.commentPosts.map((item: any, idx: number) =>
                  renderCommentPost(item, idx)
                )}
              </>
            ) : null}
          </Stack>
        </Box>
      </Center>
    </>
  );
};

const renderCommentPost = (item: any, idx: number) => {
  // const localISOString = dayjs(item.updatedAt).format("MMM DD, YYYY · HH:mm");

  return (
    <div key={idx} className="tw-mt-2">
      <Box
        maxW="1000px"
        w="full"
        bg={useColorModeValue("gray.50", "gray.600")}
        rounded="md"
        p={2}
        overflow="hidden"
      >
        <Stack direction="row" spacing={4} align="center">
          <Avatar src="https://avatars0.githubusercontent.com/u/1164541?v=4" />
          <Stack direction="row" spacing={3} align="center">
            <Text fontWeight={600}>
              {item.user.fname} {item.user.lname}
            </Text>
            <Text color="gray.500">{item?.message}</Text>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};
