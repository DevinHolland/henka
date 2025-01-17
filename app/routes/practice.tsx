import { useLocation } from "react-router";

export default function Practice() {
    const { state } = useLocation();

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl">Non-Past Polite Negative form of:</h1>
            <p className="text-4xl"><ruby>疲<rt>つか</rt></ruby>れる</p>
            <form>
                <input type="text"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}