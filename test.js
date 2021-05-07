const updatedDiff = require("./index.js");

describe("updatedDiff", () => {
  test("Returns top-level updated values", () => {
    const pokemon1 = {
      species: "pikachu",
      type: "electric",
    };
    const pokemon2 = {
      species: "raichu",
      type: "electric",
    };
    const expectedUpdates = {
      species: "raichu",
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Returns updated values from nested levels", () => {
    const pokemon1 = {
      measurements: {
        height: {
          measurement: 0.4,
          unit: "m",
        },
        weight: {
          measurement: 6,
          unit: "kg",
        },
      },
    };
    const pokemon2 = {
      measurements: {
        height: {
          measurement: 31,
          unit: "in",
        },
        weight: {
          measurement: 30,
          unit: "kg",
        },
      },
    };
    const expectedUpdates = {
      measurements: {
        height: {
          measurement: 31,
          unit: "in",
        },
        weight: {
          measurement: 30,
        },
      },
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Returns whole updated array", () => {
    const pokemon1 = {
      moves: {
        level_up: ["quick attack", "slam", "spark"],
        machine: ["frustration"],
      },
    };
    const pokemon2 = {
      moves: {
        level_up: ["quick attack"],
        machine: ["frustration", "giga impact", "hyper beam"],
      },
    };
    const expectedUpdates = {
      moves: {
        level_up: ["quick attack"],
        machine: ["frustration", "giga impact", "hyper beam"],
      },
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Returns values for new keys", () => {
    const pokemon1 = {};
    const pokemon2 = {
      thunder_stone: true,
    };
    const expectedUpdates = {
      thunder_stone: true,
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Returns null value for missing keys", () => {
    const pokemon1 = {
      mascot: true,
    };
    const pokemon2 = {};
    const expectedUpdates = {
      mascot: null,
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Returns null for updated null values that were not previously null", () => {
    const pokemon1 = {
      dynamax: {
        gigantamax: true,
      },
    };
    const pokemon2 = {
      dynamax: null,
    };
    const expectedUpdates = {
      dynamax: null,
    };

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
  test("Omits keys that have the value of null in one object, and do not exist in the other object", () => {
    const pokemon1 = {
      old_key: null,
    };
    const pokemon2 = {
      new_key: null,
    };
    const expectedUpdates = {};

    expect(updatedDiff(pokemon1, pokemon2)).toEqual(expectedUpdates);
  });
});
