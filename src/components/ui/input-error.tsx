export const InputError = ({ msg, className }: { msg: string; className?: string }) => {
  return <p className={`input-err-msg self-end ${className}`}>{msg}</p>;
};
