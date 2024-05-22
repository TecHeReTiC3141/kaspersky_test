import { useEmployeeData } from "../../context/EmployeeContext.tsx";
import { RiTeamLine } from "react-icons/ri";
import GroupEntry from "./GroupEntry.tsx";
import { DashboardProps } from "./Props.ts";


export default function GroupDashboard({ employees }: DashboardProps) {
    const { selected, setSelected, groups } = useEmployeeData();

    return (
        <div className="w-full overflow-x-auto flex items-start  gap-x-6 py-4 px-3">
            {groups.map(group => {
                    if (!employees.some(employee => employee.group === group)) {
                        return null;
                    }

                    return (
                        <div key={group} className="w-72 flex-shrink-0 border border-gray-700 pt-4 pb-2 px-3">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-xl">{group}</h4>
                                <RiTeamLine size={24}/>
                            </div>
                            {employees.filter(employee => employee.group === group).map(employee => (
                                <GroupEntry key={employee.id} employee={employee}
                                            isSelected={selected[ employee.id ] || false}
                                            setIsSelected={setSelected}/>
                            ))}
                            <button className="text-lg text-blue-400 hover:text-blue-500 mt-4">Добавить пользователя...
                            </button>
                        </div>
                    );
                }
            )}
            <div className="w-72 flex-shrink-0 border border-gray-700 py-4 px-3">
                <button className="text-xl text-blue-400 hover:text-blue-500">Добавить группу</button>
            </div>
        </div>
    );
}
