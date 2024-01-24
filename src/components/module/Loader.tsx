import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return <ThreeDots
  visible={true}
  height="60"
  width="60"
  color="#3d69c7"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{ margin: "auto" }}
  wrapperClass=""
/>
}

export default Loader