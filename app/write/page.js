
import { getServerSession } from "next-auth";
import toastAlert from "../toast";
import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import WriteUC from "./writeus";


export default function Write() {

    return (
        <div>
            <div className="p-20">

                <WriteUC></WriteUC>
            </div>




        </div>

    )
}