
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAlEHrWqdDlyTd6MIgJxImw2CUcvCgv2io",
  authDomain: "drug-quote-app.firebaseapp.com",
  projectId: "drug-quote-app",
  storageBucket: "drug-quote-app.firebasestorage.app",
  messagingSenderId: "53239915592",
  appId: "1:53239915592:web:d9d98e1ef13dadf307a47d",
  measurementId: "G-66B9ZN9G13"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const productList = document.getElementById("productList");
const appSection = document.getElementById("appSection");

async function renderProducts() {
  productList.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const p = doc.data();
    const div = document.createElement("div");
    div.className = "p-2 border rounded bg-gray-50";
    div.innerHTML = `<b>${p.name}</b> (${p.dosage})<br>
                     Packaging: ${p.packaging}<br>
                     Shelf Life: ${p.shelfLife}<br>
                     Price: $${p.price}`;
    productList.appendChild(div);
  });
}

window.addProduct = async function () {
  const data = {
    name: document.getElementById("productName").value,
    dosage: document.getElementById("dosage").value,
    packaging: document.getElementById("packaging").value,
    shelfLife: document.getElementById("shelfLife").value,
    price: parseFloat(document.getElementById("price").value)
  };
  await addDoc(collection(db, "products"), data);
  renderProducts();
};

window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Sign up successful!"))
    .catch(err => alert(err.message));
};

window.signIn = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signed in!"))
    .catch(err => alert(err.message));
};

onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("authSection").style.display = "none";
    appSection.style.display = "block";
    renderProducts();
  }
});
