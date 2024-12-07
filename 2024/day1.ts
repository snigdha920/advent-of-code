const file = Bun.file(
  "/Users/snigdhasingh/Development/advent-of-code/2024/input1.txt"
);

const input = await file.text();

const lines = input.split("\n");

const ip1: number[] = [];
const ip2: number[] = [];
for (const line of lines) {
  const words = line.split(" ");
  ip1.push(Number(words[0]));
  ip2.push(Number(words[words.length - 1]));
}

console.table(ip1);
console.table(ip2);

function part1() {
  const sortedip1 = ip1.sort();
  const sortedip2 = ip2.sort();

  let answer = 0;
  for (const [index, ip1] of sortedip1.entries()) {
    const ip2 = sortedip2[index];
    const distance = Math.abs(ip1 - ip2);
    answer += distance;
  }

  console.log("Answer is ", answer);
}

function part2() {
  const map2 = new Map<number, number>();

  for (const ip of ip2) {
    const count = map2.get(ip);
    if (count) {
      map2.set(ip, count + 1);
    } else {
      map2.set(ip, 1);
    }
  }

  let answer = 0;
  for (const ip of ip1) {
    const count = map2.get(ip) ?? 0;
    const similarity = ip * count;
    answer += similarity;
  }

  console.log("Similarity score is", answer);
}
