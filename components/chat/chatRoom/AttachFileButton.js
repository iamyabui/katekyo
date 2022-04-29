

export default function AttachFile(props) {
  const {file, setFile} = props;
  
  const handleDeleteFile = () => {
    setFile("");
    document.getElementById("inputFile").value="";
  }

  return (
    <>
    <div className="flex items-center">
      <label 
      className="hover:bg-gray-600 hover:text-white text-gray-600 border border-gray-400 px-1 py-1 rounded">
        <input 
        type="file" 
        className="hidden"
        id="inputFile"
        onChange={(e) => (setFile(e.target.files[0]))}
        ></input>
        ファイルを添付する
      </label>
      {file && (
        <div 
        className="
        flex 
        items-center
        ml-3 bg-transparent text-gray-500 border border-gray-500 px-2 rounded-full
        ">
        <p 
        className="pb-1">
          {file.name}
        </p>
        <img 
        src="/close.png" 
        className="h-2 w-2 fill-red-400 ml-2 mr-1 cursor-pointer"
        onClick={() => handleDeleteFile()}
        ></img>
        </div>
      )}
      
    </div>
    </>
  );
}
