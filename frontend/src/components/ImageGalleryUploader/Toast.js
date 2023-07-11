import {toast} from "react-toastify";
import {ERROR, INFO, SUCCESS, WARNING} from "./MessageConst";

export const notify = (message, type) => {

    switch (type) {
        case SUCCESS:
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case ERROR:
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            alert(message);
            break;
        case INFO:
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case WARNING:
            toast.warn(message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            toast.warn(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        default:
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
    }

}