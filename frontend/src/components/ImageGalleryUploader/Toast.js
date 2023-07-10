import {toast} from "react-toastify";
import {ERROR, INFO, SUCCESS, WARNING} from "./MessageConst";

export const notify = (message, type) => {

    switch (type) {
        case SUCCESS:
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            alert(message)
            break;
        case ERROR:
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            alert(message);
            break;
        case INFO:
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            break;
        case WARNING:
            toast.warn(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            break;
        default:
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
    }

}