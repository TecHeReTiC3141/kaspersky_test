import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading.tsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import TableDashboard from "./components/dashboards/TableDashboard.tsx";
import CardDashboard from "./components/dashboards/CardDashboard.tsx";
import GroupDashboard from "./components/dashboards/GroupDashboard.tsx";
import SelectDashboardVariant from "./components/SelectDashboardVariant.tsx";
import { Employee, useEmployeeData } from "./EmployeeContext.tsx";

export const dashboardVariants: Record<string, React.ComponentType<Record<string, never>>> = {
    "table": TableDashboard,
    "card": CardDashboard,
    "group": GroupDashboard,
}

export default function DashboardPage() {

    const [ activeVariant, setActiveVariant ] = useState<keyof typeof dashboardVariants>("table");

    const { setGroups, setEmployees } = useEmployeeData();

    const groupQuery = useQuery<string[]>({
        queryKey: [ "groups" ],

        queryFn: async () => {
            const response = await fetch("http://localhost:3000/groups", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            return response.json();
        },

    });

    useEffect(() => {
        setGroups(groupQuery.data || []);
    }, [ groupQuery.data, setGroups ]);

    const groupsCount = groupQuery.data?.length;

    const employeesQuery = useQuery<Employee[]>({
        queryKey: [ "employees" ],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/employees", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            return response.json();
        },
        enabled: !!groupsCount,
    });

    useEffect(() => {
        setEmployees(employeesQuery.data || []);
    }, [ employeesQuery.data, setEmployees ]);

    if (groupQuery.isLoading) {
        return <Loading text="группы"/>
    }

    if (groupQuery.isError) {
        console.log("Error fetching groups", groupQuery.error);
        throw new Error("Извините, мы не смогли загрузить группы. Попробуйте еще раз через некоторое время");
    }

    if (employeesQuery.isLoading) {
        return <Loading text="сотрудников"/>
    }

    if (employeesQuery.isError) {
        console.log("Error fetching employees", employeesQuery.error);
        throw new Error("Извините, мы не смогли загрузить сотрудников. Попробуйте еще раз через некоторое время");
    }

    const ActiveDashboard = dashboardVariants[ activeVariant ];
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 px-4">
                <button className="flex items-center border border-gray-400 p-2 rounded-lg gap-x-3 ">
                    <input type="text" placeholder="Search something..."
                           className="bg-transparent px-2 flex-1 focus:outline-none"/>
                    <FaMagnifyingGlass size={24} className="text-gray-600"/>
                </button>
                <label htmlFor="sortedField">Сортировка сотрудников:
                    <select name="sortedField" id="sortedField" className="ml-4">
                        <option value="none">Выберите поле:</option>
                        <option value="name">Полное имя</option>
                        <option value="accountName">Учетная запись</option>
                        <option value="email">Электронная почта</option>
                        <option value="group">Группа</option>
                        <option value="phoneNumber">Номер телефона</option>
                    </select>
                </label>
                <SelectDashboardVariant active={activeVariant} setActive={setActiveVariant}/>
            </div>
            <ActiveDashboard/>
        </div>
    )
}