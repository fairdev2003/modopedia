import { trpc } from "@/app/_trpc/client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
  Button,
  extendBaseTheme,
  extendTheme,
} from "@chakra-ui/react";
import Image from "next/image";
import { useUserStore } from "@/stores/user_store";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
});

const Users = () => {
  const users = trpc.getUsers.useQuery();
  console.log(users.data);

  const { account_data }: any = useUserStore();
  console.log(account_data);

  return (
    <div>
      <h1 className="text-2xl text-white font-[600]">Users</h1>
      <ChakraProvider theme={theme}>
        <TableContainer className="mt-5 ">
          <Table
            variant="unstyled"
            className="text-white border-[2px] rounded-full border-gray-900/50"
          >
            <Thead>
              <Tr>
                <Th className="text-gray-600">ID</Th>
                <Th className="text-gray-600"></Th>
                <Th className="text-gray-600">Fullname</Th>
                <Th className="text-gray-600">nick</Th>
                <Th className="text-gray-600">role</Th>
                <Th className="text-gray-600">email</Th>
                <Th className="text-gray-600">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="rounded-lg">
              {users.data?.map((user: any, index: number) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Image
                        className="rounded-full"
                        width={40}
                        height={40}
                        alt={`${user?.nick}`}
                        src={
                          user.image_src ||
                          "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                        }
                      ></Image>
                    </Td>
                    <Td>{user.first_name + " " + user.last_name}</Td>
                    <Td>{user.nick}</Td>
                    <Td>{user.role}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      {user.first_name !== account_data[0].first_name &&
                      user.role !== account_data[0].role ? (
                        <div className="flex gap-2">
                          <Button colorScheme="green">Edit</Button>
                          <Button colorScheme="red">Delete</Button>
                        </div>
                      ) : null}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </ChakraProvider>
    </div>
  );
};

export default Users;
