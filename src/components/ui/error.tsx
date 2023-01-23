type Props = { errorMsg: string | JSX.Element; defaultMsg?: string };

export const Error = ({ errorMsg, defaultMsg }: Props) => {
  return (
    <div className={'text-red-500'}>
      <div>{errorMsg ? errorMsg : defaultMsg}</div>
    </div>
  );
};
