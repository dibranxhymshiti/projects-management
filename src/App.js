import CustomToolbar from "./components/toolbar/customToolbar";
import { Container, CssBaseline } from "@material-ui/core";
import ProjectList from "./views/projectList/projectList";
import appStyles from "./styles/appStyles";

const App = () => {
  const classes = appStyles();

  return (
    <>
      <CssBaseline />
      <CustomToolbar />
      <Container maxWidth={"lg"} className={classes.container}>
        <main>
          <ProjectList />
        </main>
      </Container>
    </>
  );
};

export default App;
