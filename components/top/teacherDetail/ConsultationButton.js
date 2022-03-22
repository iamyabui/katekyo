import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";

export default function Consultation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleMessageSend = () => {

  }

  return (
    <>
      <button onClick={onOpen} className="bg-origin-blue hover:bg-origin-deepBlue text-white px-2 py-1 my-3 rounded">
        相談する
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent className="w-{400px}">
        <ModalCloseButton />
          <p className="mx-auto text-lg text-gray-700 my-8 font-bold">
            先生にメッセージを送信しましょう！
          </p>
          <textarea className="w-72 h-24 mx-auto border border-gray-300 text-gray-700 rounded py-3 px-4 mb-3"></textarea>
          <button
            onClick={handleMessageSend}
            className="mx-auto mt-5 mb-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
          >
            送信
          </button>
        </ModalContent>
      </Modal>
    </>
    
  );
}
