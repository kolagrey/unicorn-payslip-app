import moment from "moment";
import { TPayslipListItem } from "../types/payslip.type";

export const transformPayslipItemDates = (
  payslipItems: TPayslipListItem[]
): TPayslipListItem[] => {
  return payslipItems.map((payslipItem: TPayslipListItem) => ({
    ...payslipItem,
    fromDate: moment(payslipItem.fromDate).format("lll"),
    toDate: moment(payslipItem.toDate).format("lll"),
  }));
};
