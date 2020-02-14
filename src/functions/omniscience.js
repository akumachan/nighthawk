'use strict'
import { firestore } from '../firebase/firebase.js';
import mtgsdk from 'mtgsdk';
import Card from '../deck-builder/Card.js';

const formatName = process.argv[2];
const namesOfSet = process.argv.slice(3);

const getCardList = (setName) => {
  const getCardsPage = (i = 1) => mtgsdk.card.where({ set: setName, page: i })
    .then(result => {
      console.log('page%d: %s', i, result.length)
      insertCardList(result);
      if (result.length < 100) {
        return;
      }
      getCardsPage(i+1|0);
    });
  getCardsPage();
}

const insertCardList = (cardList) => {
  const insert = (card) => {
    // console.log(Object.assign({}, new Card(card)));
    firestore.collection('eternalCards').doc(card.name).set(Object.assign({}, new Card(card)))
      .then(() => {
        // console.log('Inserted "%s" into eternal cards collection successfully', card.name);
      }).catch((error) => {
        console.log(error)
      });
    if (formatName.toLowerCase() === 'standard') {
      firestore.collection('standardCards').doc(card.name).set(Object.assign({}, new Card(card)))
        .then(() => {
          // console.log('Inserted "%s" into standard cards collection successfully', card.name);
        }).catch((error) => {
          console.log(error)
        });
    }

  }
  cardList.forEach(card => {
    // If the card has some variations, the one which has smallest "number" is only inserted.
    // However, the above process might not work well because consistency between each record is not ensured.
    if (card.variations) {
      firestore.collection('eternalCards').doc(card.name).get()
      .then(doc => {
        if (doc.exists && Number(doc.data().number) < Number(card.number)) {
          console.log('skipped %s %s %s', card.name, doc.data().number, card.number);
          return;
        } else {
          console.log('inserted %s %s %s', card.name, doc.data().number, card.number);
          insert(card);
        }
      })

    } else {
      insert(card);
    }
  });

}

  // const keyword = 'Swift';
  // console.log('keyword: %s', keyword)
  // firestore.collection('standardCards').orderBy('name').startAt(keyword).endAt(keyword + '\uf8ff').get().then(result => {
  //   result.forEach((doc) => {
  //     console.log('loop')
  //         console.log(doc.data());
  //       });
  // })
namesOfSet.forEach(v => {
  console.log('Set: %s', v);
  getCardList(v);
});

// console.log(mtgsdk.card.where({name: 'Mountain'}).then(cards => console.log('%b \n %o', 'variations' in cards[0], cards)));
