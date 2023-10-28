import { Divider } from "@chakra-ui/react";
import { CreatePost, PostCard } from "../components";

export const MainFeed = () => {
  return (
    <div className="tw-mt-20 tw-p-5 tw-w-full">
      <div className="tw-w-full md:tw-w-10/12 tw-space-y-5 tw-mx-auto">
        <CreatePost />
        <Divider />
        <PostCard />
      </div>
    </div>
  );
};
