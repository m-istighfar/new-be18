import moment from "moment";

const validateDueDate = async (_: unknown, value: moment.Moment | undefined) => {
  const currentDate = moment(); 
  if (value && value.isBefore(currentDate, "day")) {
    throw new Error("Due date cannot be earlier than today!");
  }
};

export default validateDueDate