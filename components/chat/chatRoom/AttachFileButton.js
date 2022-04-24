

export default function AttachFile(props) {
  const {file, setFile} = props;
  
  const handleDeleteFile = () => {
    setFile("");
  }

  console.log(file)

  return (
    <>
    <div className="flex items-center">
      <label 
      className="hover:bg-gray-600 hover:text-white text-gray-600 border border-gray-400 px-1 py-1 rounded">
        <input 
        type="file" 
        className="hidden"
        onChange={(e) => (setFile(e.target.files[0]))}
        ></input>
        ファイルを添付する
      </label>
      {file && (
        <div 
        className="
        flex 
        items-center
        ml-3 bg-transparent text-red-400 border border-red-400 px-2 rounded-full
        ">
        <p 
        className="">
          {file.name}
        </p>
        <img 
        src="/close.png" 
        className="h-3 w-3 fill-red-400 ml-1 cursor-pointer"
        onClick={() => handleDeleteFile()}
        ></img>
        </div>
      )}
      
    </div>
    </>
  );
}
