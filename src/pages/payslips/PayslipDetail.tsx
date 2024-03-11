import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

import "./PayslipDetail.css";
import { TPayslipListItem } from "../../types/payslip.type";
import { downloadFileFromUrl } from "../../utils/downloader";
import PayslipDetailsCard from "../../components/payslip/PayslipDetailsCard";

const PayslipDetail: React.FC = () => {
  const location = useLocation<TPayslipListItem>();
  const listItem = location.state;

  const downloadFile = async (url: string) => {
    await downloadFileFromUrl({ url, fileName: "downloaded.pdf" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Payslip Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {listItem && (
          <PayslipDetailsCard item={listItem} action={downloadFile} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default PayslipDetail;
