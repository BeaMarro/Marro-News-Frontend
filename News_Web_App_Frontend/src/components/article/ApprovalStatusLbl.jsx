import EnumConverter from "../utilities/EnumConverter";
import "../../styles/ApprovalStatusLbl.css";

function ApprovalStatusLbl({status}) {
    if(status == "APPROVED") {
        return <p className="approved-status">{EnumConverter.formatEnumToText(status)}</p>
    } else if (status == "DISAPPROVED") {
        return <p className="disapproved-status">{EnumConverter.formatEnumToText(status)}</p>
    } else if (status == "PENDING") {
        return <p className="pending-status">{EnumConverter.formatEnumToText(status)}</p>
    } else {
        console.error("Invalid status");
    }
}

export default ApprovalStatusLbl;