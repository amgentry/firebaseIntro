import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";

export interface Card {
    id?: string;
    cardAvatar: string;
    cardDesc: string;
    cardImg: string
    cardName: string;
    likes: number
}

@Injectable()
export class DataProvider {

    cardListRef: AngularFirestoreCollection<Card>;
    cardList: Observable<Card[]>;


    constructor(private afs: AngularFirestore) {
        this.cardListRef = this.afs.collection<Card>('Cards');
        this.cardList = this.cardListRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data() as Card;
                const id = action.payload.doc.id;
                return {id, ...data};
            });
        });
    }

    updateCardDesc(cardID, newDesc):void {
        this.cardListRef.doc(cardID).update({"cardDesc":newDesc});
    }

    deleteCard(cardID): void {
        this.cardListRef.doc(cardID).delete();
    }

    updateLikes(card) {

    }

    addNewCard(cardInfo): void {
        if (cardInfo) {
            this.cardListRef.add(cardInfo);
        }
    }


}
