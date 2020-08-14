import React from "react";

import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import TwitterIcon from "@material-ui/icons/Twitter";
import FilterVintageRoundedIcon from "@material-ui/icons/FilterVintageRounded";
import HouseRoundedIcon from "@material-ui/icons/HouseRounded";
import LocalBarRoundedIcon from "@material-ui/icons/LocalBarRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

import {
  structuredColumns,
  structuredColumnsMap,
  structured,
} from "static/datasets/structured";

import {
  irisColumns,
  irisColumnsMap,
  iris,
  irisUnits,
} from "static/datasets/iris";
import {
  tweets,
  twitterColumns,
  twitterColumnsMap,
} from "static/datasets/tweets";
import {
  boston,
  bostonColumns,
  bostonDepVar,
  bostonDefaultIndVar,
} from "static/datasets/boston";
import {
  diabetes,
  diabetesColumns,
  diabetesDepVar,
  diabetesDefaultIndVar,
} from "static/datasets/diabetes";
import {
  wine,
  wineColumns,
  wineColumnsMap,
  wineUnits,
} from "static/datasets/wine";
import { imdb, imdbColumns, imdbColumnsMap } from "static/datasets/imdb";
import { SampleDataset, Tasks, Models } from "state/StateTypes";

export const datasetMetadata = {
  [SampleDataset.STRUCTURED]: {
    title: "Structured",
    subtitle: "Kansas City School District Dataset",
    icon: <FilterVintageRoundedIcon fontSize="small" />,
    instances: 563,
    attributes: 14,
    classes: 2,
    tags: ["Numeric"],
    columns: structuredColumns,
    columnsMap: structuredColumnsMap,
    data: structured,
    units: null,

    keywords: ["structured", "schools"],
    url:
      "https://github.com/srichakradhar/Edu-KC/blob/master/School_District_List_as_of_4_17_13_csv.csv",
    task: Tasks.TOPIC_MODELING,
    model: Models.KNN,
  },

  [SampleDataset.TWITTER]: {
    title: "Twitter",
    subtitle: "A small sample of random tweets",
    icon: <TwitterIcon fontSize="small" />,
    instances: 200,
    tags: ["Text"],
    columns: twitterColumns,
    columnsMap: twitterColumnsMap,
    data: tweets,
    column: 1,

    url:
      "https://raw.githubusercontent.com/KartikChugh/Otto/master/src/static/datasets/tweets.csv",

    keywords: ["tweet", "twitter", "sentiment"],
    task: Tasks.CATEGORIES,
    model: [Models.SENTIMENT_ANALYSIS, Models.ENTITY_RECOGNITION],
  },
  [SampleDataset.BOSTON]: {
    title: "Boston",
    subtitle: "Prices and other Boston housing data",
    icon: <HouseRoundedIcon fontSize="small" />,
    instances: 506,
    attributes: 13,
    tags: ["Numeric", "Categorical"],
    columns: bostonColumns,
    columnsMap: null,
    data: boston,
    depVar: bostonDepVar,
    indVar: bostonDefaultIndVar,

    keywords: ["boston", "house", "housing", "home"],
    task: Tasks.CATEGORIES,
    model: Models.LINEAR_REGRESSION,
  },
  [SampleDataset.DIABETES]: {
    title: "Diabetes",
    subtitle: "Prices and other Boston housing data",
    icon: <FavoriteRoundedIcon fontSize="small" />,
    instances: diabetes.length,
    attributes: 10,
    tags: ["Numeric"],
    columns: diabetesColumns,
    columnsMap: null,
    data: diabetes,
    depVar: diabetesDepVar,
    indVar: diabetesDefaultIndVar,

    keywords: ["diabetes", "disease", "progression", "health", "bmi"],
    task: Tasks.REPUTATION,
    model: Models.LINEAR_REGRESSION,
  },
  [SampleDataset.IMDB]: {
    title: "IMDB",
    subtitle: "A small sample of reviews from IMDB",
    icon: <MovieFilterRoundedIcon fontSize="small" />,
    instances: imdb.length,
    tags: ["Text"],
    columns: imdbColumns,
    columnsMap: imdbColumnsMap,
    data: imdb,
    column: 0,

    url:
      "https://raw.githubusercontent.com/KartikChugh/Otto/master/src/static/datasets/imdb.csv",

    keywords: ["imdb", "movies", "sentiment", "reviews"],
    task: Tasks.HEALTH_SAFETY,
    model: [Models.SENTIMENT_ANALYSIS, Models.ENTITY_RECOGNITION],
  },
};
