import TableEntry from "./TableEntry.tsx";
import { useEmployeeData } from "../../EmployeeContext.tsx";


export default function TableDashboard() {

    const {employees, selected, setSelected} = useEmployeeData();

    return (
        <div className="w-full">
            <table className="w-full rounded-t-lg overflow-hidden">
                <colgroup>
                    <col span={1} className="w-[5%]"/>
                    <col span={1} className="w-[15%]"/>
                    <col span={1} className="w-[25%]"/>
                    <col span={1} className="w-[25%]"/>
                    <col span={1} className="w-[15%]"/>
                    <col span={1} className="w-[15%]"/>
                </colgroup>
                <thead className="bg-slate-300 py-2">
                    <tr className="py-2 text-left">
                        <th><input className="mx-auto block" type="checkbox" onChange={event => {
                            const check = event.currentTarget?.checked;
                            const newSelected: { [id: string]: boolean } = {};
                            employees.forEach(employee => {
                                newSelected[ employee.id ] = check;
                            });
                            setSelected(newSelected);
                        }}/></th>
                        <th>Полное имя</th>
                        <th>Учетная запись</th>
                        <th>Электронная почта</th>
                        <th>Группа</th>
                        <th>Номер телефона</th>
                    </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <TableEntry key={employee.id} employee={employee} isSelected={selected[employee.id] || false} setIsSelected={setSelected} />
                ))}
                </tbody>
            </table>
        </div>
    );
}
