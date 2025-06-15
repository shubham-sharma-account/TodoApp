import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { ToDoContext } from "../contextApis/todo";

const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [edit, setEdit] = useState("");
  const [editData, setEditData] = useState({});
  const [deleteTodo, setDeleteTodo] = useState();

  const { todoList, editTodo, removeTodo } = useContext(ToDoContext);

  const inCompletedTodos = todoList.filter((todo) => !todo.isCompleted);

  const handleClickOpen = (data) => {
    setEditData(data);
    setEdit(data.name);
    setOpen(true);
  };

  const handleEditTodo = (isCompleted) => {
    // Construct the updated todo item
    const updatedTodo = {
      ...editData,
      name: edit.trim(),
      isCompleted: isCompleted || false,
    };

    editTodo(updatedTodo);
    setEditData({});
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const openDeleteModal = (id) => {
    setOpenDelete(true);
    setDeleteTodo(id);
  };

  const handleDeletTodo = () => {
    removeTodo(deleteTodo);
    setOpenDelete(false);
  };
  return (
    <>
      <Box
        sx={{
          width: 700,
          height: 150,
          borderRadius: "5px",
          boxShadow: 3,
          marginTop: 6,
          padding: 2,
        }}
      >
        <img
          src="/list.png" // Path relative to the public folder / server root
          alt="Todo App Logo" // Always provide meaningful alt text
          loading="lazy"
          style={{
            width: "80px",
            height: "70px",
            float: "left",
            marginTop: "-40px",
          }} // Example: Adjust size
        />
        <Typography sx={{ padding: 1, alignItems: "start", display: "flex" }}>
          TO-DO LIST
        </Typography>
        <Divider />
        <TableContainer sx={{ overflowY: "auto", height: "120px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {inCompletedTodos.map((row) => (
                <TableRow key={row.name}>
                  <TableCell sx={{ width: "100%" }} component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <EditIcon
                      sx={{ color: "yellowgreen" }}
                      onClick={() => {
                        handleClickOpen(row);
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      sx={{ color: "red" }}
                      onClick={() => {
                        openDeleteModal(row.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm" // ✅ Use maxWidth prop
        fullWidth
      >
        <DialogTitle>{"Want to Edit To-do?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="standard-basic"
              label="Just edit and Save, it will be updated?"
              variant="standard"
              value={edit}
              onChange={(e) => {
                setEdit(e.target.value);
              }}
              sx={{ width: "100%" }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleEditTodo(true);
            }}
            variant="outlined"
          >
            SAVE AND COMPLETE
          </Button>
          <Button onClick={handleClose} variant="outlined">
            CANCEL
          </Button>
          <Button
            onClick={() => {
              handleEditTodo(false);
            }}
            variant="contained"
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // ✅ Use maxWidth prop
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Delet To-Do"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>NO</Button>
          <Button onClick={handleDeletTodo} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoList;
