import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, setScript, useDisclosure } from "@chakra-ui/react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import Name from "../../common/form/NameForm";
import IconBig from "../common/BigIcon";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { editUserState } from "../../common/atoms";
import { useRecoilState } from "recoil";
import { teacherUserState } from "../../common/TeacherAtoms";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";

export default function TeacherProfileEdit(props) {
  const { userId } = props;
  const [teacher, setTeacher] =useRecoilState(teacherUserState);
  // const [editUser, setEditUser] = useRecoilState(editUserState);
  const [fileError, setFileError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [src, setSrc] = useState("");
  const [myFiles, setMyFiles] = useState([]);
  const [progress, setProgress] = useState("");

  const onDrop = useCallback(async(acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert("画像のみ受け付けることができます。");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });
  
  const handlePreview = (files) => {
    fileError && setFileError("");

    if (files == null) {
      return;
    }

    const file = files[0];
    if(file == null){
      return;
    }

    if(!file.type.includes("image")) {
      setFileError("imageファイルを選択してください。")
      return;
    }
    if(file.size > 200000) {
      setFileError("200kb以下の写真を選択してください。")
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
    }
  }
  
  
  const handleUpload = async (myFiles) => {
    const storage = getStorage();
    const storageRef = ref(storage, `icons/${userId}/${myFiles[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, myFiles[0]);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (err) => alert(err.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          
          setTeacher({...teacher,
            photo_url: url,
        })
          
          updateDoc(doc(db, "TeacherUsers", teacher.id), {
            photo_url: url,
          }).then(() => {
            onClose();
            setMyFiles([]);
            setProgress("");
          });
        })
      }

      )
  }

  return (
    <>
    <div className="w-52 py-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <button 
      className="text-sm py-1 px-2 my-3 bg-origin-gray hover:bg-origin-deepGray text-white rounded"
      onClick={onOpen}
      >
        写真を変更
      </button>
      <Name />
    </div>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      <ModalCloseButton />
        <ModalBody mt={5}>
          <div className="flex flex-col">
          <div 
          className="h-52 w-52 bg-gray-200 mx-auto rounded flex"
          {...getRootProps()}
          >
            <input {...getInputProps()} />
            {myFiles.length == 0 ? (
              <p className="m-auto text-gray-400">Drag & Drop your image.</p>
            ):(
              src && <img id="image" src={src} alt="icon" className="object-cover h-52 w-52" />
            )}
          </div>
          { fileError && (
            <p className="mx-auto text-xs text-red-500 mt-3">{fileError}</p>
          )}
          </div>
        </ModalBody>
         
        <ModalFooter>
          <div className="mx-auto mb-5 flex flex-col">
          {progress && (
            <p className="text-sm text-gray-500 mx-auto">
            ...Loading {progress}%
            </p>
          )}
          {myFiles.length !== 0 ? (
            <label 
            className="text-sm py-1 px-2 bg-origin-pink hover:bg-origin-deepPink text-white rounded"
            onClick={() => handleUpload(myFiles)} 
            >
              upload
            </label>
          ) : (
            <label className="text-sm py-1 px-2 bg-gray-300 text-white rounded">
              upload
            </label>
          )}
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
}
