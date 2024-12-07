const file = Bun.file(
  "/Users/snigdhasingh/Development/advent-of-code/2024/input2.txt"
);

const input = await file.text();

const lines = input.split("\n");

const reports: number[][] = [];
for (const line of lines) {
  const report = line.split(" ").map(Number);
  reports.push(report);
}

console.table(reports);

function countSafeReports() {
  let safeReportCount = 0;
  const result: number[][] = [];
  for (const report of reports) {
    let safe = 0;
    if (isReportSafeWithProblemDampener(report)) {
      safe = 1;
      safeReportCount++;
    }

    result.push([...report, safe]);
  }
  console.table(result);
  return safeReportCount;
}

function isReportSafeWithProblemDampener(report: number[]) {
  if (isReportSafe(report)) {
    return true;
  }
  for (const [index] of report.entries()) {
    const check = report.toSpliced(index, 1);
    if (isReportSafe(check)) {
      return true;
    }
  }
}

function isReportSafe(report: number[]) {
  if (report.length === 1) {
    return true;
  }
  if (report[0] === report[1]) {
    return false;
  }

  let type = report[0] > report[1] ? "decreasing" : "increasing";
  const reportLength = report.length;
  for (const [index, level] of report.entries()) {
    if (index === reportLength) {
      continue;
    }
    const cur = level;
    const next = report[index + 1];
    const dif = Math.abs(cur - next);
    if (dif > 3 || dif === 0) {
      return false;
    }
    if (type === "increasing" && cur > next) {
      return false;
    }
    if (type === "decreasing" && cur < next) {
      return false;
    }
  }
  return true;
}

const safeReportCount = countSafeReports();
console.log("Answer: ", safeReportCount);
