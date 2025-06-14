export const maskOwnerJid = (jid: string) => {
  return jid
  .replace(/\D+/g, '')
  .replace(/(\d{2})(\d)/, '+$1 $2')
  .replace(/(\d{2})(\d)/, '($1) $2')
  .replace(/(\d{4})(\d)/, '$1-$2')
  .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
  .replace(/(-\d{4})\d+?$/, '$1')
}