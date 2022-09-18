export function Message({ children, errorClass }) {
    if (!children) return <></>

  return (
    <div className={`Message message-${errorClass}`}>
      {children}
    </div>
  );
}