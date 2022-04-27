import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function SendMessageButton(props) {
    const teacher = useRecoilValue(teacherUserState);
    const { studentEmail, studentId } = props;

    const handleMessageSend = async() => {
        // 先生と生徒両方に対して連絡先リストに追加
        const contactsStudentCollectionRef = doc(db, "StudentUsers", studentId, "contacts", teacher.id);
        const contactsTeacherCollectionRef = doc(db, "TeacherUsers", teacher.id, "contacts", studentId);

        setDoc(contactsStudentCollectionRef, {
        email: teacher.email,
        });

        setDoc(contactsTeacherCollectionRef, {
        email: studentEmail,
        });

        // Chatsコレクション内sender_userとreceive_userに、生徒と先生が既に登録されていないかを確認する。
        // （既にあるのに、新しいドキュメントが作成するのを防ぐため）
        const ChatsRef = await collection(db, "Chats")
        const registrationCheck = await getDocs(ChatsRef).then(snapshot => {
          const resultArray = snapshot.docs.map((chat) => {
          const contact1 = chat.data().sender_user;
          const contact2 = chat.data().receive_user;

          if((contact1 == studentId && contact2 == teacher.id) || (contact1 == teacher.id && contact2 == studentId)) {
            return true;
          }
        })

        // もし既に登録されている場合は、trueを返し、登録されていない場合はundefinedが返される。
        const result = resultArray.find(value => {return value == true})
        return result;
      })

      // 登録有無のチェックの結果、登録されていない場合は、新しいドキュメントが作成されてsender_userとreceive_userが登録される。
      await registrationCheck !== true && (
        addDoc(collection(db, "Chats"), {
        sender_user: studentId, 
        receive_user: teacher.id,
      })
      )

      Router.push({
      pathname: "/teacherChatRoom",
      query: { id: studentId }
      });
    }


    return (
      <>
        <button 
        onClick={() => handleMessageSend()}
        className="border border-origin-pink text-origin-pink px-1 py-1 rounded text-sm hover:bg-origin-pink hover:text-white">
           メッセージを送信する
         </button>
      </>
    );
  }