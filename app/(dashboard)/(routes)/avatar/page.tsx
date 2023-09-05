import { Card } from "@/components/ui/card";
import Uploader from "@\app\(dashboard)\(routes)\avatar\Uploader";
import { Box, Center, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";
import { useState } from "react";
import { ProjectWithShots } from "./studio/[id]";




export default function Home() {
  const {
    data: projects,
    refetch: refetchProjects,
    isLoading,
  } = useQuery(`projects`, () =>
    axios
      .get<ProjectWithShots[]>("/api/projects")
      .then((response) => response.data)
  );

  return (
    <div>
      <Box>
        <Heading as="h2" mb={4} fontWeight="semibold" fontSize="2xl">
          Create a new Studio
        </Heading>
        <Uploader
          handleOnAdd={() => {
            refetchProjects();
          }}
        />
      </Box>

      <Box mt={10}>
        <Heading as="h2" mb={4} fontWeight="semibold" fontSize="2xl">
          My Studios
        </Heading>

        {isLoading && (
          <Center width="100%" textAlign="center">
            <Spinner mr={3} size="sm" speed="1s" />
            <Text>Loading studios</Text>
          </Center>
        )}

        {!isLoading && projects?.length === 0 && (
          <Center
            p={10}
            borderRadius="xl"
            backgroundColor="white"
            width="100%"
            color="blackAlpha.700"
            textAlign="center"
          >
            <Text backgroundColor="white">No studio available yet</Text>
          </Center>
        )}

        <VStack spacing={10} width="100%">
          {projects?.map((project) => (
            <Card
              key={project.id}
              project={project}
              handleRefreshProjects={() => {
                refetchProjects();
              }}
            />
          ))}
        </VStack>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await session({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  return { props: {} };
}
