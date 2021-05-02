import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  /* mozna to destrukturyzowac */
  const location = useLocation();
  const onClick = () => {
    console.log("here");
  };
  return (
    <header className="header">
      <h1>{props.title}</h1>

      { location.pathname === '/' ? 
        (<Button
          onClick={props.toggleAddButton}
          color={props.showAddTask ? "red" : "green"}
          text={props.showAddTask ? "Close" : "Add"}
        />) : ("")
      }
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
// css in js
// const headingStyle = {
//     color:'red',
//     backgroundColor:'blue'

// }

export default Header;
