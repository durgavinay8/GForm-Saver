import { toast } from "react-toastify";

const notify = (toastMsg, msgType) => {
  switch (msgType) {
    case "success":
      toast.success(toastMsg);
      break;
    case "error":
      toast.error(toastMsg);
      break;
    case "warn":
      toast.warn(toastMsg);
      break;
    case "info":
      toast.info(toastMsg);
      break;
  }
};

export default notify;
