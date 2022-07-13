export default function hoursArray() {
  const result: string[] = new Array();

  for (var i = 0; i < 24; i++) {
    if (i == 0) {
      result[i] = '';
    } else if (i < 12) {
      result[i] = `오전 ${i}시`;
    } else if (i == 12) {
      result[i] = `오후 ${i}시`;
    } else {
      result[i] = `오후 ${i - 12}시`;
    }
  }

  return result;
}
