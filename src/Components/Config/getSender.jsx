export function getSender(senders, user) {
  const sender = senders.filter((send) => send._id !== user._id)[0];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "10px",
      }}
    >
      <span>{sender.name}</span>
      <span>
        <b>Email:</b>
        {sender.email}
      </span>
    </div>
  );
}

export function getSenderDetails(senders, user) {
  const sender = senders.filter((send) => send._id !== user._id)[0];
  return sender;
}
