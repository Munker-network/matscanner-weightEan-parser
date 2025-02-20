type ParsedCode = {
  ean: string;
  plu?: string;
  weight?: number;
  price?: number;
  error?: string;
};

const codesWithWeight = ["2317445006763", "2359634709970", "2355019502846"];
const codesWithPrice = ["2090185324747", "2090907224744"];

async function parseCode(ean: string): Promise<ParsedCode> {
  if (ean.startsWith("23")) {
    return {
      ean,
      plu: ean.substring(2, 8),
      weight: parseFloat(ean.substring(8, 12)) / 1000,
    };
  } else if (ean.startsWith("20")) {
    return {
      ean,
      plu: ean.substring(2, 8),
      price: parseFloat(ean.substring(8, 12)) / 100,
    };
  } else {
    return {
      ean,
      error: "Invalid code",
    };
  }
}

(async () => {
  for (const code of [...codesWithWeight, ...codesWithPrice]) {
    console.log(await parseCode(code));
  }
})();
