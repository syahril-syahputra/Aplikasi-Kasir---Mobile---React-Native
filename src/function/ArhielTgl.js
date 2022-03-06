export const ArhielTgl = (tgl) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric', hour :'numeric', minute:'numeric' };
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglFull = (tgl) => {
  var options = {weekday: 'long',  year: 'numeric', month: 'long', day: 'numeric', hour :'numeric', minute:'numeric' };
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglOnlyMonth = (tgl) => {
  var options = { year: 'numeric', month: 'long'};
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglWithDay = (tgl) => {
  var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglLessTime = (tgl) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglLessDay = (tgl) => {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  const tgltrx = new Date(tgl)
  const tglRes = tgltrx.toLocaleDateString("id-ID", options)
  return tglRes;
}
export const ArhielTglPertama = date => {

  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export const arhielTglAkhir = date => {

  return new Date(date.getFullYear(), date.getMonth(), 1);
}