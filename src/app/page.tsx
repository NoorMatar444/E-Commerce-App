// import Image from "next/image";
import MainSlider from "./_Commponent/MainSlider/MainSlider";
import HomeCategory from "./_Commponent/HomeCategory/HomeCategory";
import Products from "./Products/page";


export default function Home() {
  return (
    <div >
      <MainSlider/>
      <HomeCategory/>
      <div className="container w-[80%] mx-auto">
        <Products/>
      </div>
    </div>
  );
}
