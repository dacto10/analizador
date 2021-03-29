const input = "a8(as(d(a)la(asd)sad))";

const checkParentesis = () => Array.from(input).filter(el => el === "(").length === Array.from(input).filter(el => el === ")").length;

