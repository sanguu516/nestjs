export const addHyphenToTel = (tel: string) =>
  tel.replace(/^(02|\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
