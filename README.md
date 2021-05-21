# updated-object-diff

A small JavaScript library that returns the updated difference between two JavaScript objects, including nested objects. 

Features:
- Handles values of data types including arrays, strings and integers
- Handles situations where keys are not present in both objects
- Omits keys with null values in both objects
- Returns whole array values of keys in updated objects

## Installation

```
npm install updated-object-diff
```

## Usage

Returns top-level and nested updated values

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
  type: "electric",
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
  species: "raichu",
  type: "electric",
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

console.log(updatedDiff(pokemon1, pokemon2));
/*
{
  species: "raichu",
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
*/
```

Returns whole updated arrays

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
  moves: {
    level_up: ["quick attack", "slam", "spark"],
    machine: ["frustration"],
  },
};
const pokemon2 = {
  species: "raichu",
  moves: {
    level_up: ["quick attack"],
    machine: ["frustration", "giga impact", "hyper beam"],
  },
};

console.log(updatedDiff(pokemon1, pokemon2));
/*
{
    species: "raichu",
    moves: {
        level_up: ["quick attack"],
        machine: ["frustration", "giga impact", "hyper beam"],
    },
};
*/
```

Returns new keys and values

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
};
const pokemon2 = {
  species: "raichu",
  thunder_stone: true,
};

console.log(updatedDiff(pokemon1, pokemon2));
/*
  {
    species: "raichu",
    thunder_stone: true,
  };
*/
```

Returns null values for missing keys

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
  mascot: true,
};
const pokemon2 = {
  species: "raichu",
};

console.log(updatedDiff(pokemon1, pokemon2));
/*
  {
    species: "raichu",
    mascot: null,
  };
*/
```

Returns null for updated null values that were not previously null

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
  dynamax: {
    gigantamax: true,
  },
};
const pokemon2 = {
  species: "raichu",
  dynamax: null,
};

console.log(updatedDiff(pokemon1, pokemon2));
/*
  {
    species: "raichu",
    dynamax: null,
  };
*/
```

Omits keys that have the value of null in one object, and do not exist in the other object

```javascript
const updatedDiff = require("updated-object-diff");

const pokemon1 = {
  species: "pikachu",
  old_key: null,
};
const pokemon2 = {
  species: "raichu",
  new_key: null,
};

console.log(updatedDiff(pokemon1, pokemon2));
/*
  {
    species: "raichu",
  };
*/
```
