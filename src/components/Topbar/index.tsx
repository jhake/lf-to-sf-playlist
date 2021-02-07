import styled from "styled-components";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import DropdownArrow from "icons/DropdownArrow";
import { useEffect, useRef, useState } from "react";

const Topbar = () => {
  const { logout } = useCurrentUser();
  const profileRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
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
        <img
          src="https://yt3.ggpht.com/yti/ANoDKi7309ul7NrwancfkYcHeonnFVLa9Oifk-gtP0JsIA=s108-c-k-c0x00ffffff-no-rj"
          alt="profile"
        />
        <p>Jeon HeeJin</p>

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
    border-radius: 50%;
    margin-right: 8px;
    height: 28px;
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
