import Header from "@/components/Header";
import Image from "next/image";
import PinList from "./components/PinList";

export default function Home() {
  return (
    <div className="flex flex-col pb-6">
      <Header />

      <PinList />
    </div>
  );
}
