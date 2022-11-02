import { useRef, useState } from "react";

type Props = {
  playerId: string;
};

export default function Bet({ playerId }: Props) {
  // state and ref hook to update and extract name field per player
  const [name, setName] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  let enteredName;
  // onChange handler for name input
  function changeHandler() {
    enteredName = nameInputRef.current?.value;
    if (enteredName) setName(enteredName);
    else setName(null);
  }

  return (
    <li>
      <label htmlFor={`${playerId} Name`}>Name</label>
      <input
        type="text"
        id={`${playerId} Name`}
        name={`${playerId} Name`}
        ref={nameInputRef}
        onChange={changeHandler}
      />
      <label htmlFor={`${playerId} Bet`}>
        {/* display name of player conditionally based on entered name otherwise default to instantiated player id */}
        {name ? `${name}'s Bet` : `${playerId} Bet`}
      </label>
      <input
        value={enteredName}
        type="text"
        id={`${playerId} Bet`}
        name={`${playerId} Bet`}
      />
    </li>
  );
}
