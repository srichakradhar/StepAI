import * as importsCode from "codegen/importsCode";
import * as regressionCode from "codegen/regressionCode";
import * as knnCode from "codegen/knnCode";
import * as sharedCode from "codegen/sharedCode";
import * as preprocessCode from "codegen/preprocessCode";
import {
  Models,
  DatasetCategory,
  Preprocessors,
  Tasks,
} from "state/StateTypes";
import * as autoEncoderCode from "codegen/autoEncoder";
import * as networkCode from "codegen/networkCode";
import * as nlpCode from "codegen/nlpCode";
import { datasetMetadata } from "static/datasets/metadata";
const StringBuilder = require("string-builder");

export const CodeGen = (state, nn_state, model_state) => {
  const sb = new StringBuilder();

  // task-based imports
  if (state.task === Tasks.TOPIC_MODELING) {
    sb.appendLine(importsCode.nlp());
  } else {
    sb.appendLine(importsCode.supervised());
  }

  console.log(state.model);
  // model-specific imports
  switch (state.model) {
    case Models.KNN:
      sb.appendLine(importsCode.knn());
      break;
    case Models.NEURAL_NETWORK_FF:
      sb.appendLine(importsCode.nn());
      break;
    case Models.LINEAR_REGRESSION:
      sb.appendLine(importsCode.linear());
      break;
    case Models.ORDINAL_REGRESSION:
      sb.appendLine(importsCode.ordinal());
      break;
    case Models.POISSON_REGRESSION:
      sb.appendLine(importsCode.poisson());
      break;
    case Models.ENCODER:
      sb.append(importsCode.autoencoders());
      break;
    default:
      break;
  }

  // preprocessor imports
  if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
    sb.appendLine(importsCode.normalization());
  }
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    sb.appendLine(importsCode.pca());
  }
  if (state.preprocessors.includes(Preprocessors.TEXT_CLEANING)) {
    sb.appendLine(importsCode.textCleaning());
  }

  // import sklearn datasets
  if (
    state.dataset_category === DatasetCategory.SAMPLE &&
    state.task !== Tasks.NATURAL_LANGUAGE
  ) {
    sb.appendLine(importsCode.sklearnDatasets());
  }

  // defines loadData function
  if (state.dataset_category === DatasetCategory.SAMPLE) {
    if (state.task === Tasks.NATURAL_LANGUAGE) {
      sb.appendLine(
        sharedCode.defineLoadDatasetNLP(
          datasetMetadata?.[state.sample_dataset]?.url
        )
      );
      sb.appendLine();
    } else {
      sb.appendLine(sharedCode.defineLoadDataset(state.sample_dataset));
    }
  } else {
    // sb.appendLine(sharedCode.defineLoadUnspecified());
  }

  // defines params
  sb.appendLine(params(state, model_state));

  // loads data
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(sharedCode.loadNLP());
  } else if (state.task === Tasks.TOPIC_MODELING) {
    sb.appendLine(sharedCode.autoEncoderDataLoad());
  } else {
    sb.appendLine(sharedCode.load());
  }

  // scales data
  if (state.preprocessors.includes(Preprocessors.NORMALIZATION)) {
    sb.appendLine(preprocessCode.normalization());
  }

  // slices data (feature selection OR pca)
  sb.appendLine(sliceData(state));

  // splits training/testing sets
  if (state.task !== Tasks.NATURAL_LANGUAGE) {
    sb.appendLine(sharedCode.split());
  }

  // cleans text data
  if (state.preprocessors.includes(Preprocessors.TEXT_CLEANING)) {
    sb.appendLine(preprocessCode.textCleaning());
  }

  // fits model
  if (state.task === Tasks.NATURAL_LANGUAGE && state.nlp_models.length > 0) {
    const doEntity = state.nlp_models.includes(Models.ENTITY_RECOGNITION);
    const doSentiment = state.nlp_models.includes(Models.SENTIMENT_ANALYSIS);
    sb.appendLine(nlpCode.modelNLP(doEntity, doSentiment));
  }

  switch (state.model) {
    case Models.KNN:
      sb.appendLine(knnCode.model());
      break;
    case Models.NEURAL_NETWORK_FF:
      sb.appendLine(networkCode.model(nn_state));
      break;
    case Models.LINEAR_REGRESSION:
      sb.appendLine(regressionCode.modelLinear());
      break;
    case Models.ORDINAL_REGRESSION:
      sb.appendLine(regressionCode.modelOrdinal());
      break;
    case Models.POISSON_REGRESSION:
      sb.appendLine(regressionCode.modelPoisson());
      break;
    case Models.ENCODER:
      sb.appendLine(autoEncoderCode.model(nn_state));
      break;
    default:
      break;
  }

  return sb.toString().trim();
};

const componentsForModel = (model) => {
  switch (model) {
    case Models.KNN:
      return 2;
    case Models.NEURAL_NETWORK_FF:
      return "None";
    case Models.ORDINAL_REGRESSION:
    case Models.POISSON_REGRESSION:
    case Models.LINEAR_REGRESSION:
      return 1;
    default:
      break;
  }
};

const params = (state, model_state) => {
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    const components = componentsForModel(state.model);
    return preprocessCode.paramsPca(components);
  }

  if (state.task === Tasks.NATURAL_LANGUAGE && state.nlp_models.length > 0) {
    return nlpCode.params(datasetMetadata?.[state.sample_dataset]?.column ?? 0);
  }

  switch (state.model) {
    case Models.KNN:
      return knnCode.params(model_state.knn_k ?? 5);
    case Models.ORDINAL_REGRESSION:
    case Models.POISSON_REGRESSION:
    case Models.LINEAR_REGRESSION:
      return regressionCode.params(
        model_state.linreg_columns?.indexOf(model_state.linreg_x_name) ?? 5
      );
    default:
      break;
  }
};

const sliceData = (state) => {
  if (state.preprocessors.includes(Preprocessors.PCA)) {
    return preprocessCode.pca();
  }

  if (state.task === Tasks.NATURAL_LANGUAGE && state.nlp_models.length > 0) {
    return nlpCode.slice();
  }

  switch (state.model) {
    case Models.KNN:
      return knnCode.slice();
    case Models.ORDINAL_REGRESSION:
    case Models.POISSON_REGRESSION:
    case Models.LINEAR_REGRESSION:
      return regressionCode.slice();
    default:
      break;
  }
};
