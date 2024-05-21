import { dashboardVariants } from "../../DashboardPage.tsx";
import { IconType } from "react-icons";
import { BsTable } from "react-icons/bs";
import { BsHddStack } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import clsx from "clsx";


const variants: { [ k: keyof typeof dashboardVariants ]: IconType } = {
    "table": BsTable,
    "card": FaRegAddressCard,
    "group": BsHddStack,
}

interface SelectDashboardVariantProps {
    active: string,
    setActive: (value: string) => void,
}

export default function SelectDashboardVariant({ active, setActive }: SelectDashboardVariantProps) {

    // TODO: remove animation and replace it with highlighting of active variant

    return (
        <div className="flex items-center gap-x-3 px-2 py-1 border border-gray-600
            rounded-md">
            {Object.entries(variants)
                .map(([ key, Icon ]) => (
                    <div className="border-r pr-3 border-gray-700 last:border-r-0 last:pr-0">
                        <button className={clsx(" p-1 rounded-md", active === key ? "bg-yellow-300" : "hover:bg-blue-300")}
                                disabled={active === key} onClick={() => setActive(key)}>
                            <Icon size={24}/>
                        </button>
                    </div>
                ))}
        </div>
    )
}