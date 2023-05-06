import React, { useLayoutEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userRows, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
function Datatable() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    // async function getUsers() {
    //   try {
    //     let list = [];
    //     const docs = await getDocs(collection(db, "Users"));
    //     docs.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
    //     setData(list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getUsers();

    // LISTENING TO REALTIME CHANGES IN COLLECTION

    //UNSUB IS A NORMAL VAR THAT SUBSCRIBES TO REAL TIME CHANGES, and ON CLEANUP WE JUST RETURN IT AS A FUNCTION TO UNSUBSCRIBE
    //SNAPSHOT IS A FUCNTION TAKING MANY ARGS, SOME AS FUNCTIONS
    const unsub = onSnapshot(
      collection(db, "Users"),
      (snapShot) => {
        console.log(snapShot);
        let list = [];
        // console.log(snapShot.docs[0]);
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    // CLEANUP FUNCTION TO UNSUB TO LISTENING CHANGES
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Users", id));
      setData((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/AdminDashboard/users/test"
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New users
        <Link to="/AdminDashboard/users/new">Add New</Link>
      </div>
      {data.length !== 0 && (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
}

export default Datatable;
