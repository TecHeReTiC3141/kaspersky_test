import clsx from "clsx";
import { EntryProps } from "./Props.ts";

export default function TableEntry({ employee, isSelected, setIsSelected }: EntryProps) {

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
            <td className="py-2">{employee.name}</td>
            <td className="py-2">{employee.accountName}</td>
            <td className="py-2">{employee.email}</td>
            <td className="py-2">{employee.group || <span className="bold">Unmanaged</span>}</td>
            <td className="py-2">{employee.phoneNumber}</td>
        </tr>
    )
}