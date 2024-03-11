import { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./Payslips.css";
import payslipData from "../../data/payslips.json";
import PayslipList from "../../components/payslip/PayslipList";
import { TPayslipListItem } from "../../types/payslip.type";
import { transformPayslipItemDates } from "../../utils/data-transformer";

const PayslipsTab: React.FC = () => {
  const [payslips, setPayslips] = useState<TPayslipListItem[]>([]);
  const history = useHistory();

  const navigateToDetail = (listItem: TPayslipListItem) => {
    history.push("/payslips/detail", listItem);
  };

  const getPayslips = () => {
    const transformedPayslip: TPayslipListItem[] = transformPayslipItemDates(
      payslipData.data
    );
    setPayslips(transformedPayslip);
  };

  useEffect(() => {
    getPayslips();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Payslips</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PayslipList listItems={payslips} action={navigateToDetail} />
      </IonContent>
    </IonPage>
  );
};

export default PayslipsTab;
