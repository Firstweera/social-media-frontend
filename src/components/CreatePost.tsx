import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineCreate } from "react-icons/md";
import { useCreatePost } from "../hooks";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface ICreatePost {
  refetchPostUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  refetchPostFollow: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

export const CreatePost = ({ refetchPostUser, refetchPostFollow }: ICreatePost) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
  const [message, setMessage] = useState<string>("");
  const createPostMutation = useCreatePost();

  const handleCreatePost = async () => {
    if (message) {
      await createPostMutation.mutateAsync(message);
      setMessage("");
      refetchPostUser();
      refetchPostFollow();
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Box>
              <Heading size="sm">
                {userInfo?.firstName} {userInfo?.lastName}
              </Heading>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Textarea
            value={message}
            placeholder="Share your feelings now!"
            onChange={(e) => setMessage(e.target.value)}
          />
        </CardBody>
        <CardFooter flexWrap="wrap" justifyContent="end">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<MdOutlineCreate />}
            onClick={() => handleCreatePost()}
            isDisabled={message.length === 0}
          >
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
