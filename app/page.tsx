import Image from "next/image";
import FashionLanding from "./FashionLanding/page";
import Test from "./test/page";

export default function Home() {
  return (
   <div>
    <FashionLanding></FashionLanding>
    <div>
    <Test></Test>
    </div>
   </div>
  );
}
