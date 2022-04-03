import Approve from "./ApproveButton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function ShowProfileContent(props) {
  const { courses, student, setStudent } = props;
  const apply_status = courses.filter(course => course.status == "申請中");
  const pending_status = courses.filter(course => course.status == "受講中");
  const finish_status = courses.filter(course => course.status == "完了");
  console.log(student)


  return (
    <div className="flex-column mx-10 w-[40rem] bg-white p-8 rounded text-gray-700">
      <div>
        <p className="font-bold mb-3">自己紹介</p>
        <p className="text-sm">{student.student?.text}</p>
      </div>
      <div className="mt-10">
        { apply_status.length > 0 && (
          <>
          <h1 className="mb-3 font-bold">申請中のコース</h1> 
            <Table>
            <Tbody>
              {apply_status.map((course, index) => (
                <Tr key={index}>
                <Td><p className="text-sm">{course.courseRef.name}</p></Td>
                <Td><p className="text-sm">{course.courseRef.price}円</p></Td>
                {console.log(course)}
                <Td px={1}><Approve course={course} student={student} setStudent={setStudent} /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </>
        )}

        { pending_status.length > 0 && (
          <>
          <h1 className="mb-3 font-bold">受講中のコース</h1> 
            <Table>
            <Thead>
              <Tr>
                <Th>コース名</Th>
                <Th>値段</Th>
                <Th>開始日</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {pending_status.map((course, index) => (
                <Tr key={index}>
                <Td><p className="text-sm">{course.courseRef.name}</p></Td>
                <Td><p className="text-sm">{course.courseRef.price}円</p></Td>
                <Td>{`${course.start_date.toDate().getMonth()+1}月${course.start_date.toDate().getDate()}日`}</Td>
                <Td></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </>
        )}

        { finish_status.length > 0 && (
          <>
          <h1 className="mb-3 font-bold">受講履歴</h1> 
            <Table>
            <Thead>
              <Tr>
                <Th>コース名</Th>
                <Th>値段</Th>
                <Th>開始日</Th>
                <Th>完了日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {finish_status.map((course, index) => (
                <Tr key={index}>
                <Td><p className="text-sm">{course.courseRef.name}</p></Td>
                <Td><p className="text-sm">{course.courseRef.price}円</p></Td>
                <Td>{`${course.start_date.toDate().getMonth()+1}月${course.start_date.toDate().getDate()}日`}</Td>
                <Td>{`${course.finish_date.toDate().getMonth()+1}月${course.finish_date.toDate().getDate()}日`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </>
        )}
            
      </div>
    </div>
  );
}
