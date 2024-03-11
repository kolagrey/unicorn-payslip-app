import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";

import "./PayslipList.css";
import { TPayslipListItem } from "../../types/payslip.type";
import { calendar } from "ionicons/icons";

interface ListItemProps {
  item: TPayslipListItem;
  action: (actionItem: TPayslipListItem) => void;
}

interface PayslipListProps {
  listItems: TPayslipListItem[];
  action: (actionItem: TPayslipListItem) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, action }) => {
  return (
    <IonItem button={true} detail={true} onClick={() => action(item)}>
      <IonLabel>
        <div className="p-2">
          <IonIcon icon={calendar} className="pr-5" />
          From: {item.fromDate}
        </div>
        <div className="p-2">
          <IonIcon icon={calendar} className="pr-5" />
          To: {item.toDate}
        </div>
      </IonLabel>
    </IonItem>
  );
};

const PayslipList: React.FC<PayslipListProps> = ({ listItems, action }) => {
  return (
    <IonList>
      {listItems.map((listItem: TPayslipListItem) => (
        <ListItem key={listItem.id} item={listItem} action={action} />
      ))}
    </IonList>
  );
};

export default PayslipList;
