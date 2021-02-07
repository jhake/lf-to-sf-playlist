import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCurrentUser } from "hooks/useCurrentUser";
import Button from "components/Button";
import styled from "styled-components";
import Close from "icons/Close";

interface Props {
  spotifyTrackIds: Array<string>;
}

const CreatePlaylist = (
  { spotifyTrackIds }: Props = { spotifyTrackIds: [] }
) => {
  const { logout, authHeader } = useCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = async () => {
    const url = process.env.REACT_APP_BACKEND_API_URL + "create_playlist";
    const body = {
      name: playlistName === "" ? "New Playlist" : playlistName,
      tracks: spotifyTrackIds.map(
        (spotifyTrackId) => `spotify:track:${spotifyTrackId}`
      ),
    };

    try {
      setLoading(true);
      await axios.post(url, body, {
        headers: authHeader,
        timeout: 5000,
      });
      toast.success("Playlist created!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login again.");
        logout();
      } else toast.error(error.message);
    }

    setLoading(false);
    setModalOpen(false);
  };

  useEffect(() => {
    document
      .getElementById("modalBg")
      ?.addEventListener("click", function (e: any) {
        if (document.getElementById("modal")?.contains(e.target)) {
        } else {
          setModalOpen(false);
        }
      });
  }, []);

  return spotifyTrackIds.length > 0 ? (
    <>
      <Button onClick={() => setModalOpen(true)}>Create Playlist</Button>
      <ModalBackground id="modalBg" className={modalOpen ? "active" : ""}>
        <CreatePlaylistModal id="modal">
          <div>
            <h3>Create playlist</h3>
            <div
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <Close />
            </div>
          </div>
          <StyledInput
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e: any) => {
              setPlaylistName(e?.target?.value);
            }}
          />
          <Button disabled={loading} onClick={handleSubmit}>
            CREATE
          </Button>
        </CreatePlaylistModal>
      </ModalBackground>
    </>
  ) : (
    <></>
  );
};

const ModalBackground = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 1;
  align-items: center;
  justify-content: center;
  background: #000000aa;

  &.active {
    display: flex;
  }
`;

const CreatePlaylistModal = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 24px;

  width: 400px;
  height: 200px;

  div {
    display: flex;
    justify-content: space-between;

    h3 {
      margin-bottom: 16px;
    }

    .close {
      width: 32px;
      height: 32px;
      margin-top: -8px;
      border-radius: 50%;
      &:hover {
        background: #555;
      }
    }
  }

  ${Button} {
    font-size: 14px;
    background: #fff;
    color: #111;
    height: 32px;
    padding: 0 30px;
    margin-top: 16px;
    float: right;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background: #444;
  border-radius: 4px;
  border: none;
  padding: 16px;
  height: 38px;
  outline: none;
  color: #fff;

  ::placeholder {
    color: #bbb;
    opacity: 1; /* Firefox */
  }
`;

export default CreatePlaylist;
