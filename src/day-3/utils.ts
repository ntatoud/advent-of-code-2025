export function getBankJoltages(bank: string) {
  return bank.split("").map((v) => Number.parseInt(v));
}
