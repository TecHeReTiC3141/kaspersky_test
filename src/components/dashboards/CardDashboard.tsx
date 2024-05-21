import CardEntry from "./CardEntry.tsx";
import { useEmployeeData } from "../../context/EmployeeContext.tsx";
import { DashboardProps } from "./Props.ts";


export default function CardDashboard({employees}: DashboardProps) {

    const {selected, setSelected} = useEmployeeData();

    return (
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
            {employees.map(employee => (
                <CardEntry employee={employee} isSelected={selected[employee.id] || false} setIsSelected={setSelected} />
            ))}
        </div>
    );
}
