// eslint-disable-next-line react/prop-types
function Error ({message}) {
  return ( 
    <div>
      <span className="text-red-500 text-sm">{message}</span>
    </div>
   );
}

export default Error;