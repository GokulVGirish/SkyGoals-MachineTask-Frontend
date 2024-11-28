import moment from "moment";
import { Customer } from "./App";
const Table=({tableItems}:{tableItems:Customer[]})=>{


    return (
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Mobile</th>
            <th className="py-3 px-6 text-left">DOB</th>
            <th className="py-3 px-6 text-left">Joined Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-400 divide-y divide-gray-700">
          {tableItems?.map((item, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4">{item?.name_of_customer}</td>
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-4">{item?.mobile_number}</td>
              <td className="px-6 py-4">
                {moment(item?.dob).format("DD/MM/YY")}
              </td>
              <td className="px-6 py-4">
                {moment(item?.created_at).format("DD/MM/YY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
export default Table