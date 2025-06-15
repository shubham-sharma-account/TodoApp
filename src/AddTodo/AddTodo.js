import React, { useContext } from "react";
import { Box, Divider, Fab, Grid, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { ToDoContext } from "../contextApis/todo";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useContext(ToDoContext);

  const handleAddTodo = () => {
    addTodo({ name: todo });
    setTodo("");
  };

  return (
    <>
      <Box
        sx={{
          width: 700,
          height: 130,
          borderRadius: "5px",
          boxShadow: 3,
          marginTop: 6,
          padding: 2,
        }}
      >
        <img
          src="/notes.png" // Path relative to the public folder / server root
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
          ADD ITEM
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid size={10} sx={{ height: 20 }}>
            <TextField
              id="standard-basic"
              label="What do you want to do?"
              variant="standard"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={2} sx={{ height: 20 }}>
            <Fab color="primary" aria-label="add">
              <AddIcon onClick={handleAddTodo} />
            </Fab>
          </Grid>
        </Grid>
        {/* <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      /> */}
      </Box>
    </>
  );
};

export default AddTodo;
