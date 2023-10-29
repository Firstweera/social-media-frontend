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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { fetchAuthentication, useSignIn } from "../hooks";
import { ILoginData } from "../interfaces";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";

interface ILoginPage {
  setIsAuthen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInCard = ({ setIsAuthen }: ILoginPage) => {
  const signInMutation = useSignIn();
  const navigate = useNavigate();
  const toast = useToast();

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

  const handleSubmit = async (
    values: ILoginData,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    try {
      const { data } = await signInMutation.mutateAsync(values);

      if (data?.status === "ok") {
        localStorage.setItem("token", data?.token);
        const authCheck = await fetchAuthentication();
        if (authCheck) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(authCheck?.data.result)
          );
          setIsAuthen(true);
          navigate("/main");
        } else {
          console.log("Unsuccessfully authenticated");
          setIsAuthen(false);
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast({
        position: "top-right",
        title: "Login failed!",
        description: "Please check there is an incorrect email or password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
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
            onSubmit={handleSubmit}
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
                <Stack spacing={10}>
                  {/* <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack> */}
                  <Button
                    mt={4}
                    isLoading={props.isSubmitting}
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
          <div className="tw-pt-5">
            <Stack align={"center"}>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Text color={"gray.600"}>Not a member?</Text>
                <Link color={"blue.400"} to="/register">
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
