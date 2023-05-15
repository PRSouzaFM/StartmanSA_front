import Image from "next/image"
import dynamic from 'next/dynamic';
import Navbar from "./Components/Navbar";
const StockTable = dynamic(() => import('./Components/StockTable'), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="grid items-center m-20">
          <StockTable />
        </div>
      </main>
    </>
  );
}
