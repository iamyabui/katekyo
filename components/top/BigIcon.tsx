export default function IconBig(props) {
  const { photo_url } = props;

  return (
  <div className="my-1 w-20 h-20 rounded-full bg-white">
    <img id="image" src={photo_url} alt="icon" className="w-20 h-20 rounded-full object-cover"/>
  </div>
  )
}
