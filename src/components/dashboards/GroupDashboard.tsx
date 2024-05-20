import { useEmployeeData } from "../../EmployeeContext.tsx";
import CardEntry from "./CardEntry.tsx";


export default function GroupDashboard() {
    const {employees, selected, setSelected} = useEmployeeData();

    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 ">
            {employees.map(employee => (
                <CardEntry employee={employee} isSelected={selected[employee.id] || false} setIsSelected={setSelected} />
            ))}
        </div>
    );
}
