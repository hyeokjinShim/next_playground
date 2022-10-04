export const getBoardItemSize = (lengthOfBoardRow: number): string =>
  `${(576 - lengthOfBoardRow * 2 * 2) / lengthOfBoardRow}px`;

export const getColorDiff = (stage: number): number =>
  Math.max(25 - Math.floor((stage + 1) / 3), 1);

export const getRandomBoolean = (): boolean => Math.random() < 0.5;

export const getRandomRGB = (): number => Math.floor(Math.random() * 256);

export const getRGBColorArray = (): number[] =>
  Array.from({length: 3}, () => getRandomRGB());

export const getBoardColor = ([red, green, blue]: number[]): string =>
  `rgb(${red}, ${green}, ${blue})`;

export const getAnswerBoardColor = (
  [red, green, blue]: number[],
  diff: number,
): string =>
  `rgb(${
    getRandomBoolean() ? Math.min(255, red + diff) : Math.max(0, red - diff)
  }, ${
    getRandomBoolean() ? Math.min(255, green + diff) : Math.max(0, green - diff)
  }, ${
    getRandomBoolean() ? Math.min(255, blue + diff) : Math.max(0, blue - diff)
  })`;

export const getColor = (
  stage: number,
): {boardColor: string; answerBoardColor: string} => {
  const rgbArray = getRGBColorArray();

  const boardColor = getBoardColor(rgbArray);
  const answerBoardColor = getAnswerBoardColor(rgbArray, getColorDiff(stage));

  return {boardColor, answerBoardColor};
};
