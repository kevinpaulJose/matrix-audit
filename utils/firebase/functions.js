import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firedb, storage } from "./config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

export const getAllItems = async (date) => {
  const docRef = doc(firedb, "items", "1234");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    const items = docSnap.data().items;

    const salesCollection = collection(firedb, "sales");
    const q = query(salesCollection, where("readableDate", "==", date));
    const querySnapshot = await getDocs(q);
    let allSales = {};
    querySnapshot.forEach((doc) => {
      allSales = doc.data();
    });
    let newSales = {};
    if (querySnapshot.empty) {
      let newItems = [];
      for (const item of items) {
        newItems.push({ amount: "0", title: item });
      }
      // newSales.date = Date.now() + Math.random();
      newSales.expenseTotal = 0;
      newSales.expenses = newItems;
      newSales.sales = [0, 0, 0, 0, 0];
      newSales.salesTotal = 0;
      newSales.total = 0;
      newSales.upi = 0;
      newSales.notes = "";
      newSales.readableDate = date;
      const id = Date.now().toLocaleString();
      await setDoc(doc(firedb, "sales", id), newSales);
      return [newSales, true];
    } else {
      let finalExpenses = [];
      let expenses = allSales.expenses;
      for (const item of items) {
        const presentItem = expenses.filter((v) => v.title == item);
        if (presentItem.length == 0) {
          finalExpenses.push({ amount: 0, title: item });
        } else {
          finalExpenses.push(presentItem[0]);
        }
      }
      allSales.expenses = finalExpenses;
      return [allSales, false];
    }
  }
};

export const getOnlyItems = async () => {
  const docRef = doc(firedb, "items", "1234");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists) {
    return docSnap.data().items;
  }
  return [];
};

export const updateItems = async (items) => {
  await setDoc(doc(firedb, "items", "1234"), { items: items });
};

export const updateSales = async (data, date) => {
  const salesRef = collection(firedb, "sales");
  const q = query(salesRef, where("readableDate", "==", date));

  const querySnapshot = await getDocs(q);
  let docId = "";
  querySnapshot.forEach((doc) => {
    docId = doc.id;
  });
  const docRef = doc(firedb, "sales", docId);
  await updateDoc(docRef, {
    expenseTotal: data.expenseTotal,
    expenses: data.expenses,
    notes: data.notes,
    sales: data.sales,
    salesTotal: data.salesTotal,
    total: data.total,
    upi: data.upi,
  });
};

export const getReportData = async (dateRange) => {
  let fruitBillTotal = 0.0;
  let salesTotal = 0.0;
  let expenseTotal = 0.0;
  let totalTotal = 0.0;
  let upiTotal = 0.0;
  let expenses = [];
  let allData = [];
  const salesCollection = collection(firedb, "sales");
  for (let date of dateRange) {
    const q = query(salesCollection, where("readableDate", "==", date));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        allData.push(doc.data());
      });
    }
  }
  for (let sale of allData) {
    expenseTotal += sale.expenseTotal;
    salesTotal += sale.salesTotal;
    totalTotal += sale.total;
    upiTotal += sale.upi;
    expenses.push(sale.expenses);
    const currentFriuitAmount = sale.expenses.filter(
      (v) => v.title == "Fruit Bill"
    )[0].amount;
    fruitBillTotal += parseFloat(currentFriuitAmount);
  }
  const retData = {
    expenseTotal: expenseTotal,
    salesTotal: salesTotal,
    totalTotal: totalTotal,
    upiTotal: upiTotal,
    expenses: expenses,
    fruitBillTotal: fruitBillTotal,
  };
  console.log(retData);
  return retData;
};

export const deletePending = async (id) => {
  const downloadRef = collection(firedb, "downloads");
  const q = query(downloadRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  let docId = "";
  querySnapshot.forEach((doc) => {
    docId = doc.id;
  });
  await deleteDoc(doc(firedb, "downloads", docId));
};
