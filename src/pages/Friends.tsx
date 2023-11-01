import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";

export const Friends = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Following</Tab>
          <Tab>Followers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>one!</Text>
          </TabPanel>
          <TabPanel>
            <Text>two!</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
