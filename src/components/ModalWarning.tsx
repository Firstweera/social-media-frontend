import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  ModalFooter,
  HStack,
} from "@chakra-ui/react";
import { useDeletePost } from "../hooks";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface IModalWarning {
  isOpen: boolean;
  onClose: () => void;
  overlay: JSX.Element;
  postId: number;
  refetchPostUser:
    | (<TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
      ) => Promise<QueryObserverResult<any, unknown>>)
    | undefined;
  refetchPostFollow:
    | (<TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
      ) => Promise<QueryObserverResult<any, unknown>>)
    | undefined;
}

export const ModalWarning = ({
  isOpen,
  onClose,
  overlay,
  postId,
  refetchPostUser,
  refetchPostFollow,
}: IModalWarning) => {
  const deletePostMutation = useDeletePost();

  const handleDeleteClick = async () => {
    try {
      await deletePostMutation.mutateAsync(postId);
      refetchPostUser && refetchPostUser();
      refetchPostFollow && refetchPostFollow();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent className="lg:tw-w-1/2">
        <ModalHeader>Confirm delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this post?</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button onClick={() => handleDeleteClick()} color={"red.300"}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
