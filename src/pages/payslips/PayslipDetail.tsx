import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

import "./PayslipDetail.css";
import { TPayslipListItem } from "../../types/payslip.type";
import { downloadFileFromUrl } from "../../utils/downloader";
import PayslipDetailsCard from "../../components/payslip/PayslipDetailsCard";
import { useState } from "react";

const PayslipDetail: React.FC = () => {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] =
    useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>();
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const location = useLocation<TPayslipListItem>();
  const listItem = location.state;

  const downloadFile = (url: string) => {
    setFileUrl(url);
    setIsOpenConfirmDialog(true);
  };

  const onConfirmDownload = async () => {
    if (fileUrl) {
      try {
        await downloadFileFromUrl({ url: fileUrl, fileName: "downloaded.pdf" });
        setToastMessage("Payslip downloaded successfully");
      } catch (error: any) {
        setToastMessage(`Unable to download payslip. Reason: ${error.message}`);
      } finally {
        setIsOpenConfirmDialog(false);
        setIsToastOpen(true);
      }
    }
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
        <IonAlert
          isOpen={isOpenConfirmDialog}
          header="Confirmation"
          message="Do you want to download this payslip to your device?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {},
            },
            {
              text: "OK",
              role: "confirm",
              handler: onConfirmDownload,
            },
          ]}
          onDidDismiss={() => setIsOpenConfirmDialog(false)}
        ></IonAlert>
        <IonToast
          isOpen={isToastOpen}
          message={toastMessage}
          onDidDismiss={() => setIsToastOpen(false)}
          duration={3000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default PayslipDetail;
