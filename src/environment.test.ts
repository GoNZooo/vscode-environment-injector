import { getLineEnding, parseEnvironmentFile } from "./environment";
import * as fs from "fs";

test("Line endings are recognized properly for test files", () => {
  const lfString = fs.readFileSync("./normal.lf.env").toString();
  const crlfString = fs.readFileSync("./normal.crlf.env").toString();
  const lfExportString = fs.readFileSync("./normal.lf.env").toString();
  const crlfExportString = fs.readFileSync("./normal.crlf.env").toString();

  expect(getLineEnding(lfString)).toEqual("\n");
  expect(getLineEnding(crlfString)).toEqual("\r\n");
  expect(getLineEnding(lfExportString)).toEqual("\n");
  expect(getLineEnding(crlfExportString)).toEqual("\r\n");
});

test("`parseBuffer` reads normal environment file with LF line endings correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./normal.lf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads normal environment file with CRLF line endings correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./normal.crlf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` (CRLF) correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export.crlf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` (LF) correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export.lf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` and very bad formatting (CRLF) correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export-and-bad-formatting.crlf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});

test("`parseBuffer` reads environment file with `export` and very bad formatting (LF) correctly", () => {
  const [p1, p2] = parseEnvironmentFile("./with-export-and-bad-formatting.lf.env");

  expect(p1).toEqual({ key: "SOME_KEY", value: "some value" });
  expect(p2).toEqual({ key: "SOME_OTHER_KEY", value: "42" });
});
