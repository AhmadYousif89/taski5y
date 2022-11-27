export const InputError = ({ msg, className }: { msg: string; className?: string }) => {
  return <p className={`input-err-msg ${className}`}>{msg}</p>;
};
