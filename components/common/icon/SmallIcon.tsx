export default function IconSmall(props) {
  const { photo_url } = props;

  return (
    <div className="my-1 w-10 h-10 rounded-full bg-white">
      <img id="image" src={photo_url} alt="icon" className="w-10 h-10 rounded-full object-cover"/>
    </div>
  )
  
}
