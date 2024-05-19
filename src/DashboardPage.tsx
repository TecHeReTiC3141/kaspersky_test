import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading.tsx";

export interface Employee {
    name: string,
    accountName: string,
    email: string,
    group: string,
    phoneNumber: string,
}

export default function DashboardPage() {

    const groupQuery = useQuery<string[]>({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/groups", {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                }
            });
            return response.json();
        }
    });

    const groupsCount = groupQuery.data?.length;

    const employeesQuery = useQuery<Employee[]>({
        queryKey: ["employees"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/employees", {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                }
            })
            return response.json();
        },
        enabled: !!groupsCount,
    });

    if (groupQuery.isLoading) {
        return <Loading text="группы" />
    }

    if (groupQuery.isError) {
        console.log("Error fetching groups", groupQuery.error);
        throw new Error("Извините, мы не смогли загрузить группы. Попробуйте еще раз через некоторое время");
    }

    if (employeesQuery.isLoading) {
        return <Loading text="сотрудников" />
    }

    if (employeesQuery.isError) {
        console.log("Error fetching employees", employeesQuery.error);
        throw new Error("Извините, мы не смогли загрузить сотрудников. Попробуйте еще раз через некоторое время");
    }


    return (
        <div>

        </div>
    )
}