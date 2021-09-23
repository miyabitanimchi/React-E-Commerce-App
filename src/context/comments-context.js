import React, { useEffect, useState, createContext } from 'react';
import { firebase } from '../firebase/firebase';
import { useAuthContext } from "./auth-context";

const labels = {
  // 0.5: 'Useless',
  1: 'Useless',
  // 1.5: 'Poor',
  2: 'Poor',
  // 2.5: 'Ok',
  3: 'Ok',
  // 3.5: 'Good',
  4: 'Good',
  // 4.5: 'Excellent',
  5: 'Excellent',
};


export const CommentsContext = createContext()

export default function CommentsProvider({ children }) {

  const { user } = useAuthContext();
  const [readProductId, setReadProductId] = useState()
  const [productComments, setProductComments] = useState([])
  const [avgRating, setavgRating] = useState()


  function writeComment(info, id) {

    const comments = firebase.database().ref(`comments/${id}`)

    const data = {
      name: user.displayName,
      img: user.providerData[0].photoURL,
      comment: info.comment,
      rating: info.rating,
      postDate: info.postDate
    }
    comments.push(data)
    console.log(`comment added`)

  }

  function readComment(id) {
    const starCountRef = firebase.database().ref(`comments/${id}`);
    starCountRef.on('value', (snapshot) => {
      const data = snapshot.val();

      const dataList = []
      for (let id in data) {
        dataList.push(data[id])
      }
      dataList.reverse()
      // console.log(data)
      setProductComments(dataList)
      const tempRating = []
      dataList.map((data) => {
        tempRating.push(data.rating)
      })

      // averge rating
      setavgRating(Math.round(tempRating.reduce((a,b)=>a+b,0)/tempRating.length))
      

    });
  }

  
console.log(avgRating)

  useEffect(() => {
    readComment(readProductId)

  }, [readProductId])


  return (
    <CommentsContext.Provider value={{ writeComment, setReadProductId, productComments, readProductId,avgRating,labels }}>
      {children}
    </CommentsContext.Provider>
  )
}
