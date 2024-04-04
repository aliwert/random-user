import React, { useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import Footer from "./components/footer/Footer";
import Swal from "sweetalert2";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userText, setUserText] = useState("");
  const [temp, setTemp] = useState("");
  const fetchNewUser = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setCurrentUser(data.results[0]);
    console.log(data);
  };
  const addUserToList = () => {
    if (currentUser && !userList.includes(currentUser)) {
      setUserList([...userList, currentUser]);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully adding",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        title: "This user is already added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <main>
      <div className="block bcg-orange"></div>
      <div className="block">
        <div className="container">
          <img
            src={currentUser ? currentUser.picture.large : defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">{userText}</p>
          <p className="user-value">{currentUser ? temp : "My name is..."}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My name is");
                setTemp(
                  currentUser?.name?.first + " " + currentUser?.name?.last
                );
              }}
            >
              <img
                src={
                  currentUser && currentUser.gender === "female"
                    ? womanSvg
                    : manSvg
                }
                alt="user"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My email is");
                setTemp(currentUser?.email);
              }}
            >
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My age is");
                setTemp(currentUser?.dob?.age);
              }}
            >
              <img
                src={
                  currentUser && currentUser.gender === "female"
                    ? womanAgeSvg
                    : manAgeSvg
                }
                alt="age"
                id="iconImg"
              />
            </button>
            <button
              className="icon"
              data-label="location"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My state is");
                setTemp(currentUser?.location?.state);
              }}
            >
              <img src={mapSvg} alt="mail" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My phone is");
                setTemp(currentUser?.phone);
              }}
            >
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={() => {
                setCurrentUser(currentUser);
                setUserText("My password is");
                setTemp(currentUser?.login?.password);
              }}
            >
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={fetchNewUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUserToList}>
              add user
            </button>
          </div>
          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
                <th className="th">State</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr className="body-tr" key={index}>
                  <td>{user.name.first}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob.age}</td>
                  <td>{user.location.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}
export default App;
