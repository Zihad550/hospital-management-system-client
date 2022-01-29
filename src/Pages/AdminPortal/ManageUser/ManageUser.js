import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import UpdateUserModal from "../UpdateUserModal/UpdateuserModal";

const ManageUser = ({ user, setRefresh }) => {
  const { name, email, image, role, personId } = user;
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure")) {
      fetch(
        `https://shielded-meadow-04426.herokuapp.com/users?role=${role}&&personId=${personId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          data.deletedCount > 0 && alert("Deleted successfully");
          setRefresh(true);
        });
    }
  };
  return (
    <>
      <Grid item md={4} lg={3} xs={12} sm={6}>
        <Card>
          <CardMedia
            component="img"
            width="100%"
            height="300px"
            image={`data:image/png;base64,${image}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              component="div"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  display: "inline-block",
                  background: "violet",
                  px: 2,
                  borderRadius: 5,
                  mr: 1,
                }}
              >
                {role}
              </Typography>{" "}
              {name}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
              Contact: {email}
            </Typography>
            <ButtonGroup>
              <Button
                onClick={() => setOpen(true)}
                endIcon={<EditIcon />}
                color="secondary"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                endIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </Grid>

      {/* modal */}
      <UpdateUserModal
        user={user}
        setOpen={setOpen}
        open={open}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default ManageUser;
