/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { useSelector } from "react-redux";
import data from "../data/dataTable.json";
import { RootState } from "@/store";

interface sideTableInterface {
  id: number;
  data1: string;
  data2: string;
}

const SideTable = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div
      className={`${
        theme !== "light" ? "bg-[#2C2C2C]" : "bg-[#D9D9D9]"
      } w-[400px] h-screen fixed top-0 right-0 pt-20 px-5 overflow-auto`}
    >
      <table className="w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-300">
            <th
              colSpan={2}
              className="border border-gray-500 p-2 text-center font-bold"
            >
              Proses
            </th>
          </tr>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 p-2 text-center">
              Attributes
            </th>
            <th className="border border-gray-500 p-2 text-center">Example</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e: sideTableInterface) => (
            <tr key={e.id} className="hover:bg-gray-100">
              <td className="border border-gray-500 p-2 text-center">
                {e.data1}
              </td>
              <td className="border border-gray-500 p-2 text-center">
                {e.data2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SideTable;
