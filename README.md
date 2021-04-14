
# Introduction

This repo will maintain the code bases for the static site storykits.plezmo.com

The site has interactive 3D models of Plezmo Storykits.

  

# Getting Started

To add new GLTF models to the site, we first need to get the exported GLTF files of the model from the designers.

Then we need to use [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) to convert the GLTFs into DRACO compatible GLTFs.

This is done to reduce the size of the models.

Install "gltf-pipeline" by running `npm install --global gltf-pipeline`

Then, for each model, run `gltf-pipeline -i model.gltf -o model-draco.gltf -d --draco.compressionLevel 10`

Add the *model-draco.gltf* file to the `assets/gltfs` folder.
Add the corresponding entry for the model in the `gltfModelInfoMap` in `init()` of `index.js`

The model to be rendered is picked up from the URL parameter `model`
Sample URL parameter: `?model=fitness-band`

In case of an invalid or absent model URL parameter, the site renders the magic wand model.

When adding a new model to `gltfModelInfoMap`, the key will be matched to the `model` URL parameter.
  

# Build and Test

Install HTTP Server via NPM by running `npm install --global http-server`

In the directory of the static site, run `http-server`

No automated testing is available or planned for yet.