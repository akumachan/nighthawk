import { firestore } from '../common/firebase'

export default class DeckBuilderDao {
  static getDeck = () => {
    firestore.collection('decks').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });;
  }
}