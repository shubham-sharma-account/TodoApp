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
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { ToDoContext } from "../contextApis/todo";

const CompletedTodoList = () => {
  const [deleteTodo, setDeleteTodo] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const { todoList, removeTodo } = useContext(ToDoContext);
  const completedTodos = todoList.filter((todo) => todo.isCompleted);

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
          src="/completed.webp" // Path relative to the public folder / server root
          alt="Todo App Logo" // Always provide meaningful alt text
          loading="lazy"
          style={{
            width: "80px",
            height: "80px",
            float: "left",
            marginTop: "-50px",
          }} // Example: Adjust size
        />
        <Typography sx={{ padding: 1, alignItems: "start", display: "flex" }}>
          COMPLETED
        </Typography>
        <Divider />
        <TableContainer sx={{ overflowY: "auto", height: "120px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {completedTodos.map((row) => (
                <TableRow key={row.name} sx={{ border: "none" }}>
                  <TableCell sx={{ width: "100%" }} component="th" scope="row">
                    {row.name}
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

export default CompletedTodoList;
