import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading.tsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import React, { ReactNode, useState } from "react";
import { DashboardProps } from "./components/dashboards/DashboardProps.ts";
import TableDashboard from "./components/dashboards/TableDashboard.tsx";
import CardDashboard from "./components/dashboards/CardDashboard.tsx";
import GroupDashboard from "./components/dashboards/GroupDashboard.tsx";
import SelectDashboardVariant from "./components/SelectDashboardVariant.tsx";


export interface Employee {
    name: string,
    accountName: string,
    email: string,
    group: string,
    phoneNumber: string,
}

export const dashboardVariants: Record<string, React.ComponentType<DashboardProps>> = {
    "table": TableDashboard,
    "card": CardDashboard,
    "group": GroupDashboard,
}

export default function DashboardPage() {

    const [ activeVariant, setActiveVariant ] = useState<keyof typeof dashboardVariants>("table");

    const groupQuery = useQuery<string[]>({
        queryKey: [ "groups" ],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/groups", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            return response.json();
        }
    });

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


    const ActiveDashboard = dashboardVariants[activeVariant];
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <button className="flex items-center border border-gray-400 p-2 rounded-lg gap-x-3 ">
                    <input type="text" placeholder="Search something..." className="bg-transparent px-2 flex-1 focus:outline-none"/>
                    <FaMagnifyingGlass size={24} className="text-gray-600"/>
                </button>
                <SelectDashboardVariant active={activeVariant} setActive={setActiveVariant} />
            </div>
            <ActiveDashboard employees={employeesQuery.data ?? []} groups={groupQuery.data ?? []}/>
        </div>
    )
}