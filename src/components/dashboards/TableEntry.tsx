import clsx from "clsx";
import { EntryProps } from "./Props.ts";
import { useEmployeeData } from "../../context/EmployeeContext.tsx";
import Highlighter from "react-highlight-words";

export default function TableEntry({ employee, isSelected, setIsSelected }: EntryProps) {

    const { searchField, searchValue } = useEmployeeData();

    return (
        <tr key={employee.id} className={clsx(isSelected ? "bg-blue-200 even:bg-blue-300" : "odd:bg-gray-100")}>
            <td className=""><input className="mx-auto block" type="checkbox"
                                    checked={isSelected} onChange={event => {
                const check = event.currentTarget?.checked;
                console.log(event.currentTarget, event.currentTarget?.checked);
                setIsSelected(prev => ({
                    ...prev,
                    [ employee.id ]: check,
                }));
            }}/></td>
            <td className="py-2">{searchField === "name" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.name}
            /> : employee.name}</td>
            <td className="py-2">{searchField === "accountName" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.accountName}
            /> : employee.accountName}</td>
            <td className="py-2">{searchField === "email" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.email}
            /> : employee.email}</td>
            <td className="py-2">{searchField === "group" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.group || "Unmanaged"}
            /> : employee.group || "Unmanaged"}</td>
            <td className="py-2">{searchField === "phoneNumber" && searchValue ? <Highlighter
                highlightClassName="bg-yellow-400"
                searchWords={[ searchValue ]}
                autoEscape={true}
                textToHighlight={employee.phoneNumber}
            /> : employee.phoneNumber}</td>
        </tr>
    )
}