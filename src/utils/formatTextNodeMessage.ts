const formatTextNodeMessage = (message: string) => {
  if (!!message) return message.replace(/\\r\\n/g, '\n');
  return undefined;
}

export default formatTextNodeMessage;