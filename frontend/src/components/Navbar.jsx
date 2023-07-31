
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { Logout } = useLogout()
  const {user} = useAuthContext()
  const handleClick = () => {
    Logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/" >
          <h1>
            Gym Buddy
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick} >
                Log Out
              </button>
            </div>
          )}
          {!user && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;