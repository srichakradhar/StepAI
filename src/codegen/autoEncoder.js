const StringBuilder = require("string-builder");

export const model = (state) => {
  const sb = new StringBuilder();
  sb.appendLine("# Build model");
  sb.appendLine("model = Sequential()");
  sb.append(layerCode(state));

  sb.appendLine(
    `model.compile(optimizer='${state.optimizer}', loss='${state.loss}')`
  );
  sb.appendLine("# Fit model to dataset");
  sb.appendLine("model.fit(X_train, y_train, batch_size=32, epochs=100)");
  sb.appendLine("# Evaluate model!");
  sb.appendLine("model.evaluate(X_test, y_test, batch_size=32");

  return sb.toString();
};

const layerCode = (state) => {
  const sb = new StringBuilder();
  const layers = state.layers;
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (i === 0) {
      sb.appendLine(inputConvLayerCode(layer));
    }
    sb.appendLine(maxPoolingLayerCode(layer));
    sb.appendLine(convLayerCode(layer));
    sb.appendLine(maxPoolingLayerCode(layer));
    sb.appendLine(convLayerCode(layer));
  }
  return sb.toString();
};

const convLayerCode = (layer) => {
  const str = `model.add(layers.Conv2D(64, (3, 3), activation='relu'))`;
  return str;
};

const inputConvLayerCode = (layer) => {
  const str = `model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)))`;
  return str;
};

const maxPoolingLayerCode = (layer) => {
  const str = `model.add(layers.MaxPooling2D((2, 2)))`;
  return str;
};
