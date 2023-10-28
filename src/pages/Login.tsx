import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useSignIn } from "../hooks";
import { ILoginData } from "../interfaces";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

export const SignInCard = () => {
  const { mutate: login } = useSignIn();
  const navigateTo = useNavigate();

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters";
    }
    return error;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(
              values: ILoginData,
              actions: { setSubmitting: (arg0: boolean) => void }
            ) => {
              setTimeout(() => {
                login(values, {
                  onSuccess: (data: { status: string; token: string }) => {
                    if (data?.status === "ok") {
                      localStorage.setItem("token", data?.token);
                      navigateTo("/main");
                    }
                  },
                  onError: (err: any) => {
                    <Alert status="warning">
                      <AlertIcon />
                      {err}
                    </Alert>;
                  },
                });
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: { isSubmitting: boolean | undefined }) => (
              <Form>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: { field: ILoginData; form: any }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mt={4}
                    >
                      <FormLabel>Email</FormLabel>
                      <Input {...field} type="email" placeholder="Email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }: { field: ILoginData; form: any }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mt={4}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <div className="tw-pt-5">
            <Stack align={"center"}>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Text color={"gray.600"}>Not a member?</Text>
                <Link color={"blue.400"} href="/register">
                  <Text color={"blue.400"}>Sign up now</Text>
                </Link>
              </Flex>
            </Stack>
          </div>
        </Box>
      </Stack>
    </Flex>
  );
};
