import React, { useState } from 'react';

export interface UserDataProps {
  disabled: boolean;
  currentList: string[];
  addList: (data: string) => Promise<void>;
  deleteList: (i: number) => Promise<void>;
};

export const UserData: React.FC<UserDataProps> = (props) => {
  const [addListText, changeAddListText] = useState('');
  const [isAdding, changeIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(Array(props.currentList.length).fill(false));

  const onAddClick = () => {
    changeIsAdding(true);
    props.addList(addListText)
      .then(() => {
        changeAddListText('');
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        changeIsAdding(false);
      });
  }

  const onDeleteClick = async (index: number) => {
    isDeleting[index] = true;
    setIsDeleting(isDeleting);
    props.deleteList(index).then(() => {
      setIsDeleting(isDeleting.filter((v, i) => i !== index));
    }).catch(() => {
      isDeleting[index] = false;
      setIsDeleting(isDeleting);
    });
  }

  return (
    <React.Fragment>
      <ul>
      {props.currentList.map((value, index) => (
        <li key={index}>
          <span style={{margin: 10}}>{value}</span>
          <button
            onClick={() => onDeleteClick(index)}
            disabled={props.disabled}
          >
            x
          </button>
        </li>
      ))}
      </ul>
      <div style={{marginTop: 10, marginBottom: 10}}>
        <input
          type="text"
          onChange={(e) => changeAddListText(e.target.value)}
          value={addListText}
          disabled={props.disabled}
        />
        <input
          type="button"
          value="Add"
          disabled={props.disabled || !addListText}
          onClick={onAddClick}
        />
      </div>
    </React.Fragment>
  );
}
