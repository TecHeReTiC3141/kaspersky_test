import TableEntry from "./TableEntry.tsx";
import { useEmployeeData } from "../../context/EmployeeContext.tsx";
import { DashboardProps } from "./Props.ts";


export default function TableDashboard({ employees }: DashboardProps) {

    const { selected, setSelected } = useEmployeeData();
    // TODO: think about adding column for position
    return (
        <div className="w-full">
            <table className="w-full rounded-t-lg overflow-hidden max-md:text-sm">
                <colgroup>
                    <col span={1} className="w-[5%]"/>
                    <col span={1} className="w-[15%]"/>
                    <col span={1} className="w-[25%]"/>
                    <col span={1} className="w-[25%]"/>
                    <col span={1} className="w-[15%]"/>
                    <col span={1} className="w-[15%]"/>
                </colgroup>
                <thead className="bg-slate-300 dark:bg-slate-700 py-2">
                <tr className="text-left">
                    <th className="py-3"><input className="mx-auto block" type="checkbox" onChange={event => {
                        const check = event.currentTarget?.checked;
                        const newSelected: { [ id: string ]: boolean } = {};
                        employees.forEach(employee => {
                            newSelected[ employee.id ] = check;
                        });
                        setSelected(newSelected);
                    }}/></th>
                    <th className="py-3">Полное имя</th>
                    <th className="py-3">Учетная запись</th>
                    <th className="py-3">Электронная почта</th>
                    <th className="py-3">Группа</th>
                    <th className="py-3">Номер телефона</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <TableEntry key={employee.id} employee={employee} isSelected={selected[ employee.id ] || false}
                                setIsSelected={setSelected}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}
