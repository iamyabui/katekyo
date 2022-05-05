import { useRecoilValue } from "recoil";
import { subjectsState } from "../common/TopAtoms";

export const useSubjectFilter = (props) => {
    const subjects = useRecoilValue(subjectsState);
    const { all } = props;

    // 科目が選択されている場合は、Filterを実行。
    if (subjects.length !== 0){
        // 1,filteredSubjects: 選択した科目に該当する先生を出力。
        const filteredSubjects = subjects.map((subject) => {
            const filteredTeacher = all.filter(function (teacher) {
                return teacher.subjects.includes(subject)
            })
            return filteredTeacher
        })

        // 2,複数選択されていた場合に、一つでも合致しない教科があるか確認。（もし合致しない場合は、条件に当てはまらないとして記録し、空配列を次の処理で返す。）
        const checkResult = filteredSubjects.map((value) => {
            if (value.length == 0) {
                return "NG"
            }else{
                return "OK"
            }
        })

        // 3,もしひとつも合致しなかった科目がある場合は、空配列を返す。
        //   合致した場合は、1で出力したフィルター結果を返す。
        if (checkResult.includes("NG")) {
            return [];
        } else {
            return filteredSubjects[0];
        }
    } else {
        return all;
    }
}