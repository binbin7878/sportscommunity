import Login from "../login/page";
import Sign from "../sign";

export default function Signup() {
    return (
        <div className="p-20">
            <form action="/api/auth/signup" method="POST">
                <Sign></Sign>
                
            </form>
        </div>
    )
}