import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@material-ui/icons";
import CreateProject from "../../components/modals/createProject";
import projectListStyles from "../../styles/projectListStyles";
import CreateUser from "../../components/modals/createUser";
import { selectProject } from "../../redux/actions/projectsActions";

const ProjectList = () => {
  const classes = projectListStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { projects } = useSelector((state) => state.projects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { users } = useSelector((state) => state.users);
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(search), 500);
    return () => clearTimeout(timeOutId);
  }, [search]);

  useEffect(() => {
    setFilteredProjects(projects);
    setSearch("");
  }, [projects]);

  const userName = (id) => {
    return users.find((usr) => usr.id === id).name;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editProject = (id) => {
    const project = projects.find((p) => p.id === id);
    dispatch(selectProject(project));
    setOpenCreateProject(true);
  };

  const createProject = () => {
    dispatch(selectProject({}));
    setOpenCreateProject(true);
  };

  const handleSearch = (searchInput) => {
    const newFilter = projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        project.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredProjects(newFilter);
  };

  return (
    <>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
        className={classes.buttonGroup}
      >
        <Grid item>
          <TextField
            id="search"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item>
          <ButtonGroup variant={"contained"}>
            <Button onClick={() => setOpenCreateUser(true)}>Create user</Button>
            <Button color={"primary"} onClick={() => createProject()}>
              Create project
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow key={project.id}>
                    <TableCell component="th" scope="row">
                      {project.id}
                    </TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{userName(project.owner)}</TableCell>
                    <TableCell>
                      <Edit
                        style={{ cursor: "pointer" }}
                        onClick={() => editProject(project.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <CreateProject
        open={openCreateProject}
        handleClose={() => setOpenCreateProject(false)}
      />

      <CreateUser
        open={openCreateUser}
        handleClose={() => setOpenCreateUser(false)}
      />
    </>
  );
};

export default ProjectList;
