import Header from "../components/common/header";
import TeacherLeftMenu from "../components/common/teacherLeftMenu";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export default function Achievement() {
  return (
    <>
      <Header />
      <div className="bg-top-bg w-screen h-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div>
            <Table>
              <Thead>
                <Tr>
                  <Th>コース名</Th>
                  <Th>生徒</Th>
                  <Th>開始日</Th>
                  <Th>終了日</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>チャット相談/週1ビデオ相談（30分）</Td>
                  <Td>山田　花子</Td>
                  <Td>2021/12/31</Td>
                  <Td>2022/02/31</Td>
                </Tr>
                <Tr>
                  <Td>チャット相談/週1ビデオ相談（30分）</Td>
                  <Td>山田　花子</Td>
                  <Td>2021/12/31</Td>
                  <Td>2022/02/31</Td>
                </Tr>
                <Tr>
                  <Td>チャット相談/週1ビデオ相談（30分）</Td>
                  <Td>山田　花子</Td>
                  <Td>2021/12/31</Td>
                  <Td>2022/02/31</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
