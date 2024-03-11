import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/react";

import "./PayslipDetailsCard.css";
import { TPayslipListItem } from "../../types/payslip.type";
import { calendar, download } from "ionicons/icons";

interface PayslipDetailsCardProps {
  item: TPayslipListItem;
  action: (actionItem: string) => void;
}

const PayslipDetailsCard: React.FC<PayslipDetailsCardProps> = ({
  item,
  action,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{item.id}</IonCardTitle>
        <IonCardSubtitle>Payslip ID</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <div className="pb-5">
          <IonIcon icon={calendar} className="pr-5" />
          <IonText>From: {item.fromDate}</IonText>
        </div>
        <div className="pb-5">
          <IonIcon icon={calendar} className="pr-5" />
          <IonText>To: {item.toDate}</IonText>
        </div>
        <IonButton color={"primary"} onClick={() => action(item.file)}>
          Download Payslip<IonIcon slot="end" icon={download}></IonIcon>
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PayslipDetailsCard;
