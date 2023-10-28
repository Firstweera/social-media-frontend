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
import { MdOutlineCreate } from "react-icons/md";

export const CreatePost = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Textarea placeholder="Here is a sample placeholder" />
        </CardBody>
        <CardFooter flexWrap="wrap" justifyContent="end">
          <Button size="sm" variant="ghost" leftIcon={<MdOutlineCreate />}>
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
