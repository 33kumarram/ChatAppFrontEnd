export const isLastMessageOfSender = (messages, i) => {
  return (
    messages[i]?.sender?._id !== messages[i + 1]?.sender?._id ||
    messages[i + 1] === undefined
  );
};
