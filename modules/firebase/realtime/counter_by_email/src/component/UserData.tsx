import React from 'react';

export interface UserDataProps {
  count: number;
  addCounter: () => Promise<void>;
  resetCounter: () => Promise<void>;
};

export const UserData: React.FC<UserDataProps> = (props) => {
  const onAddClick = async () => {
    await props.addCounter();
  }

  const onResetClick = async () => {
    await props.resetCounter();
  }

  return (
    <React.Fragment>
      <div>
        count:{props.count}
      </div>
      <div>
        <button onClick={onAddClick}>
          +
        </button>
      </div>
      <div>
        <button onClick={onResetClick}>
          reset
        </button>
      </div>
    </React.Fragment>
  );
}
