import React, { useCallback, useRef, useState } from "react";
import Button from "./Button";
import UserInfo from "./UserInfo";
import useThrottle from "./useThrottle.hook";
import { User } from "./User.types";

const URL = "https://jsonplaceholder.typicode.com/users";

function App(): JSX.Element {
  let cacheUsers = useRef(new Map());
  const [user, setUser] = useState<User | null>(null);

  const receiveRandomUser = useCallback(async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;
    console.log("cal!!!");
    if (cacheUsers.current.has(id)) {
      console.log("in cache!!!");
      setUser(cacheUsers.current.get(id));
    } else {
      try {
        const response = await fetch(`${URL}/${id}`);
        const _user = await response.json();
        console.log(_user);
        cacheUsers.current.set(_user.id, _user);
        setUser(_user);
      } catch (e) {
        console.error("something got wrong!!!");
      }
    }
  }, []);

  const throttledReceiveRandomUser = useThrottle(receiveRandomUser, 1500);

  console.log(
    "cache",
    Array.from(cacheUsers.current ? cacheUsers.current.entries() : [])
  );

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={throttledReceiveRandomUser} />
      <UserInfo user={user} />
    </div>
  );
}

export default App;
