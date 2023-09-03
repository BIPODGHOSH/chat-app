// import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   console.log(img);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());

//       const uploadTask = uploadBytesResumable(storageRef, img);
//       console.log(uploadTask);

//       uploadTask.on(
//         (error) => {
//           // console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now().toDate().toString(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     } else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now().toDate().toString(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };
//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <label htmlFor="file">
//           <img src={Attach} alt="" />
//         </label>
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;

// import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import {
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
//   getMetadata, // Add this import
// } from "firebase/storage";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   console.log(img);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     setUploading(true);

//     try {
//       if (img) {
//         const storageRef = ref(storage, uuid());

//         const uploadTask = uploadBytesResumable(storageRef, img);

//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             // Track upload progress if needed
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(`Upload is ${progress}% done`);
//           },
//           (error) => {
//             console.error("Upload error:", error);
//             setUploading(false);
//           },
//           () => {
//             // Upload successful
//             getDownloadURL(uploadTask.snapshot.ref)
//               .then(async (downloadURL) => {
//                 // Verify if the uploaded object exists
//                 const metadata = await getMetadata(uploadTask.snapshot.ref);

//                 if (metadata && metadata.size > 0) {
//                   await updateDoc(doc(db, "chats", data.chatId), {
//                     messages: arrayUnion({
//                       id: uuid(),
//                       text,
//                       senderId: currentUser.uid,
//                       date: Timestamp.now().toDate().toString(),
//                       img: downloadURL,
//                     }),
//                   });
//                 } else {
//                   console.error("Uploaded object does not exist.");
//                 }
//                 setUploading(false);
//               })
//               .catch((downloadError) => {
//                 console.error("Download URL error:", downloadError);
//                 setUploading(false);
//               });
//           }
//         );
//       } else {
//         await updateDoc(doc(db, "chats", data.chatId), {
//           messages: arrayUnion({
//             id: uuid(),
//             text,
//             senderId: currentUser.uid,
//             date: Timestamp.now().toDate().toString(),
//           }),
//         });
//         setUploading(false);
//       }

//       await updateDoc(doc(db, "userChats", currentUser.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });

//       await updateDoc(doc(db, "userChats", data.user.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });

//       setText("");
//       setImg(null);
//     } catch (error) {
//       console.error("Error:", error);
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <label htmlFor="file">
//           <img src={Attach} alt="" />
//         </label>
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend} disabled={uploading}>
//           {uploading ? "Uploading..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  getMetadata,
} from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  console.log(img);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setUploading(true);

    try {
      if (img) {
        // Use the same filename for the image
        const fileName = uuid(); // You can change this logic as needed

        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress if needed
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            setUploading(false);
          },
          () => {
            // Upload successful
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                // Verify if the uploaded object exists
                const metadata = await getMetadata(uploadTask.snapshot.ref);

                if (metadata && metadata.size > 0) {
                  await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now().toDate().toString(),
                      img: downloadURL,
                    }),
                  });
                } else {
                  console.error("Uploaded object does not exist.");
                }
                setUploading(false);
              })
              .catch((downloadError) => {
                console.error("Download URL error:", downloadError);
                setUploading(false);
              });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now().toDate().toString(),
          }),
        });
        setUploading(false);
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
    } catch (error) {
      console.error("Error:", error);
      setUploading(false);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} disabled={uploading}>
          {uploading ? "Uploading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Input;
