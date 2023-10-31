import React, { useContext, useMemo } from "react";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { useUpdateProfile } from "../hooks";
import * as Yup from "yup";
import { UserContext } from "../App";

interface IPopoverForm {
  dataProfile: {
    email?: string;
    exp?: number;
    firstName: string;
    iat?: number;
    lastName: string;
    userId: number;
  };
}

export const PopoverForm = ({ dataProfile }: IPopoverForm) => {
  const { setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const updateUsername = useUpdateProfile();
  const toast = useToast();

  const handleSubmit = async (
    values: { fname: string; lname: string },
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      const { data } = await updateUsername.mutateAsync(values);
      //   console.log("data", data);

      if (data?.status === "ok") {
        // console.log("test");
        toast({
          title: "Update username success!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        setUser({
          isAuthen: !!token,
          profileMode: {
            mode: "myProfile",
            userId: userInfo?.userId,
          },
        });
        onClose();
        location.reload();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Update username failed!",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const initialValues = useMemo(
    () => ({
      fname: dataProfile?.firstName,
      lname: dataProfile?.lastName,
    }),
    [dataProfile]
  );

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="auto"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton size="sm" icon={<EditIcon />} aria-label="Edit" />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4}>
                {renderField("fname", "First Name")}
                {renderField("lname", "Last Name")}
                <ButtonGroup display="flex" justifyContent="flex-end">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    loadingText="Loading..."
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </Stack>
            </Form>
          )}
        </Formik>
      </PopoverContent>
    </Popover>
  );
};

const renderField = (
  name: string,
  label:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | null
    | undefined
) => (
  <Field name={name}>
    {({
      field,
      form,
    }: {
      field: { fname: string; lname: string };
      form: any;
    }) => (
      <FormControl
        id={name}
        isRequired
        isInvalid={form.errors[name] && form.touched[name]}
      >
        <FormLabel>{label}</FormLabel>
        <Input {...field} type="text" />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
});

export default PopoverForm;
