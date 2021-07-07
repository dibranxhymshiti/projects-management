import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@material-ui/core";
import createProjectStyles from "../../styles/createProjectStyles";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject } from "../../redux/actions/projectsActions";

const CreateProject = (props) => {
  const classes = createProjectStyles();
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.users);
  const [project, setProject] = useState({});

  const onSaveProject = (e) => {
    e.preventDefault();
    if (selectedProject.id) {
      dispatch(updateProject(project));
    } else {
      dispatch(addProject(project));
    }
    props.handleClose();
  };

  useEffect(() => {
    setProject(selectedProject);
  }, [selectedProject]);

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={props.open}
      onClose={props.handleClose}
    >
      <form autoComplete="off" onSubmit={onSaveProject}>
        <DialogTitle id="customized-dialog-title" data-testid={"title"}>
          {!!selectedProject.id ? "Update" : "Create"} project
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            required
            className={classes.textField}
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            required
            className={classes.textField}
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
          <TextField
            id="user"
            select
            label="User"
            variant="outlined"
            defaultValue=""
            required
            className={classes.textField}
            value={project.owner}
            onChange={(e) => setProject({ ...project, owner: e.target.value })}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button color={"secondary"} onClick={props.handleClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateProject;
