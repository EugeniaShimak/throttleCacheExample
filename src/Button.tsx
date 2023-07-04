import { memo } from "react";

interface IButtonProps {
  onClick: () => void;
}

const Button = memo(function Button({ onClick }: IButtonProps): JSX.Element {
  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <button type="button" onClick={handleButtonClick}>
      get random user
    </button>
  );
});

export default Button;
