import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const userLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const userLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
