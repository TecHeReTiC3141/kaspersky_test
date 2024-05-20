import { Link } from "react-router-dom";

export default function HomePage() {

    // TODO: create proper home page
    return (
        <div>
            <h1>Hello there</h1>
            <Link to="/dashboard">Go to dashboard</Link>
        </div>
    )
}