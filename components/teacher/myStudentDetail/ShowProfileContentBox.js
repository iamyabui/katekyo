import Approve from "./ApproveButton";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import FinishApprove from "./FinishApproveButton";
import FinishCancel from "./FinishCancelButton";

export default function ShowProfileContent(props) {
  const { courses, student, setStudent } = props;
  console.log(courses, student)
  const apply_status = courses.filter(course => course.studentInfo.status == "申請中");
  const pending_status = courses.filter(course => course.studentInfo.status == "受講中");
  const finishApply_status = courses.filter(course => course.studentInfo.status == "終了申請中");
  const finish_status = courses.filter(course => course.studentInfo.status == "終了");
  console.log(apply_status)


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
                <Td><p className="text-sm">{course.courseName}</p></Td>
                <Td><p className="text-sm">{course.coursePrice}円</p></Td>
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
                <Td><p className="text-sm">{course.courseName}</p></Td>
                <Td><p className="text-sm">{course.coursePrice}円</p></Td>
                <Td>{`${course.studentInfo.start_date.toDate().getMonth()+1}月${course.studentInfo.start_date.toDate().getDate()}日`}</Td>
                <Td></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </>
        )}

        {finishApply_status.length > 0 && (
          <>
          <h1 className="my-5 font-bold">終了申請</h1> 
          {finishApply_status.map((course, index) => (
          <div key={index} className="mx-auto items-center px-5 py-4 my-2 flex justify-between w-[30rem] bg-card-blue rounded">
            <div className="text-sm">
              <div className="flex">
                <p className="font-bold text-gray-600 mr-3">コース名</p>
                <p>{course.courseName}</p>
              </div>
              <div className="flex">
                <p className="font-bold text-gray-600 mr-3">値段</p>
                <p>{course.coursePrice}円</p>
              </div>
              <div className="flex">
                <p className="font-bold text-gray-600 mr-3">受講開始日</p>
                <p>{`${course.studentInfo.start_date.toDate().getMonth()+1}月${course.studentInfo.start_date.toDate().getDate()}日`}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <FinishApprove course={course} setStudent={setStudent}/>
              <FinishCancel course={course} setStudent={setStudent}/>
            </div>
          </div>
          ))}
          </>
        )}

        { finish_status.length > 0 && (
          <>
          <h1 className="my-5 font-bold">受講履歴</h1> 
            <Table>
            <Thead>
              <Tr>
                <Th>コース名</Th>
                <Th>値段</Th>
                <Th>開始日</Th>
                <Th>終了日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {finish_status.map((course, index) => (
                <Tr key={index}>
                <Td><p className="text-sm">{course.courseName}</p></Td>
                <Td><p className="text-sm">{course.coursePrice}円</p></Td>
                <Td>{`${course.studentInfo.start_date.toDate().getMonth()+1}月${course.studentInfo.start_date.toDate().getDate()}日`}</Td>
                <Td>{`${course.studentInfo.finish_date.toDate().getMonth()+1}月${course.studentInfo.finish_date.toDate().getDate()}日`}</Td>
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
