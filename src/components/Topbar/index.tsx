import styled from "styled-components";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import DropdownArrow from "icons/DropdownArrow";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Topbar = () => {
  const { currentUser, logout, authHeader } = useCurrentUser();
  console.log(currentUser?.info);
  const profileRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const API_LOGOUT_URL = process.env.REACT_APP_BACKEND_API_URL + "logout";

  const handleLogout = async () => {
    try {
      await axios.delete(API_LOGOUT_URL, {
        timeout: 2000,
        headers: authHeader,
      });
      logout();
      toast.success("Logged out successfully.");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again");
        logout();
      } else toast.error(error.message);
    }
  };

  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (document.getElementById("profile")?.contains(e.target)) {
      } else {
        setDropdownOpen(false);
      }
    });
  }, []);

  return (
    <TopbarContainer>
      <Profile
        onClick={() => setDropdownOpen(!dropdownOpen)}
        ref={profileRef}
        id="profile"
      >
        <img src={currentUser?.info?.profile_image} alt="profile" />
        <p>{currentUser?.info?.name}</p>

        <DropdownArrow />
        <Dropdown className={dropdownOpen ? "active" : ""}>
          <button onClick={handleLogout}>Log out</button>
        </Dropdown>
      </Profile>
    </TopbarContainer>
  );
};

const TopbarContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  height: 60px;

  background: #141414;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  background: #333;
  height: 32px;
  border-radius: 16px;
  padding: 2px;
  cursor: pointer;

  .arrow {
    margin-right: 8px;
  }

  img {
    margin-right: 8px;
    height: 28px;
    width: 28px;
    border-radius: 50%;
    background-position: 50% 50%;
    background-size: cover;
  }

  p {
    font-size: 12px;
    font-weight: 800;
    margin-right: 16px;
  }
`;

const Dropdown = styled.div`
  display: none;
  border-radius: 4px;
  position: absolute;
  top: 50px;
  right: 0px;
  background-color: #222;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
  z-index: 1;

  &.active {
    display: block;
  }

  button {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    float: none;
    color: #b3b3b3;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;

    &:hover {
      background: #444;
      color: #fff;
    }
  }
`;
export default Topbar;
