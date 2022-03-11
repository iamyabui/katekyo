import { db } from "../src/firabase";
import { collection, getDocs } from "firebase/firestore";

const Test: React.FC = () => {
  // コレクション（test)の取得
  const colRef = collection(db, "test");

  // コレクションから全てのドキュメントを取得してconsoleに出力
  getDocs(colRef).then((snapshot) => {
    console.log(snapshot.docs);
  });

  return <div></div>;
};

export default Test;
