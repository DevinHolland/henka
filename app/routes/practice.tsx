import { useLocation } from "react-router";

export default function Practice() {
    const { state } = useLocation();

    return (
        <div>
            <h1>Practice</h1>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}