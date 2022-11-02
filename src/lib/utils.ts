import {
  colorKeys,
  colorNames,
  figureKeys,
  figureNames,
} from "../components/constants";
import data from "../data.json";

export function reverseString(str: string) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

export function getResult(firstCard: string, overCard: string, hole: number) {
  if (hole > 0 && firstCard && overCard) {
    // Find cards

    let _firstCard = data.cards.find((element) => {
      return element.n === firstCard || element.r === firstCard;
    });
    let _overCard = data.cards.find((element) => {
      return element.n === overCard || element.r === overCard;
    });

    if (!_firstCard || !_overCard) {
      return "";
    }

    var firstCardColors = _firstCard.c;
    // var firstCardFigures = firstCard.f;
    if (_firstCard.r === firstCard) {
      firstCardColors = reverseString(firstCardColors);
      // firstCardFigures = reverseString(firstCardFigures);
    }

    var overCardColors = _overCard.c;
    var overCardFigures = _overCard.f;
    if (_overCard.r === overCard) {
      overCardColors = reverseString(overCardColors);
      overCardFigures = reverseString(overCardFigures);
    }

    // Locate hole

    var positionHole = -1;
    for (let i = 1; i <= hole; i++) {
      positionHole = firstCardColors.indexOf("_", positionHole + 1);
    }

    var resultColor = overCardColors.charAt(positionHole);
    var resultFigure = overCardFigures.charAt(positionHole);

    // Final result in readable text

    var finalString = "Error";

    if (resultColor === "_" || resultColor === "_") {
      finalString = "Error, impossible combination";
    } else {
      finalString =
        colorNames.get(resultColor) +
        " " +
        figureNames.get(resultFigure) +
        " (Press " +
        figureKeys.get(resultFigure) +
        " " +
        colorKeys.get(resultColor) +
        ")";
    }

    return finalString;
  }

  return "";
}

export function getCardNames() {
  let cardNames: string[] = [];
  data.cards.map((obj) => {
    cardNames.push(obj.n);
    cardNames.push(obj.r);
  });

  cardNames.sort();

  return cardNames;
}
