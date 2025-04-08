"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  ImageIcon,
  Code,
  Upload,
  Download,
  Server,
  Layers,
  BarChart,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import ScanPage from "../scan/page";

export default function ModelTrainingPage() {
  const [activeTab, setActiveTab] = useState("dataset")

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">
        Plant Identification Model Training
      </h1>
      <p className="text-green-600 dark:text-green-400 mb-8 max-w-3xl">
        Follow this guide to create and train your custom plant identification model using Google Colab
      </p>

      <Tabs defaultValue="dataset" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dataset" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            Dataset
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Layers className="h-4 w-4 mr-2" />
            Training
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="integration" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Server className="h-4 w-4 mr-2" />
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dataset" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Creating Your Plant Dataset
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Collect and organize images of plants at different growth stages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  1. Collect Plant Images
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Gather images of plants at various growth stages (seeds, seedlings, sprouts, mature plants).
                  Aim for at least 100 images per plant type and growth stage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-3 text-center">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <ImageIcon className="h-12 w-12 text-green-400 dark:text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Seeds</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-3 text-center">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <ImageIcon className="h-12 w-12 text-green-400 dark:text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Seedlings</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-3 text-center">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <ImageIcon className="h-12 w-12 text-green-400 dark:text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Young Plants</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/50 rounded-lg p-3 text-center">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <ImageIcon className="h-12 w-12 text-green-400 dark:text-green-500" />
                    </div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Mature Plants</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  2. Organize Your Dataset
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Structure your dataset in folders by plant type and growth stage:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`dataset/
├── tomato/
│   ├── seed/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   ├── seedling/
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   ├── young/
│   │   ├── image1.jpg
│   ├── mature/
│       ├── image1.jpg
├── basil/
│   ├── seed/
│   ├── seedling/
│   ├── young/
│   ├── mature/
...`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  3. Data Sources
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Consider these sources for building your dataset:
                </p>
                <ul className="list-disc list-inside text-green-600 dark:text-green-400 space-y-1">
                  <li>Take your own photos of plants at different stages</li>
                  <li>Public datasets like PlantVillage or PlantCLEF</li>
                  <li>Open Images Dataset (filter for plant categories)</li>
                  <li>iNaturalist dataset (contains many plant species)</li>
                  <li>Kaggle datasets related to plants and agriculture</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => setActiveTab("training")}
                className="ml-auto bg-green-600 hover:bg-green-700 text-white"
              >
                Next: Training
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Training Your Model in Google Colab
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Use transfer learning to create a plant identification model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  1. Set Up Google Colab
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Create a new notebook in Google Colab and connect to a GPU runtime:
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900">
                    <Code className="mr-2 h-4 w-4" />
                    Open Google Colab
                  </Button>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Then: Runtime → Change runtime type → GPU
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  2. Upload Your Dataset
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Upload your dataset to Google Colab or connect to Google Drive:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`# Mount Google Drive
from google.colab import drive
drive.mount('/content/drive')

# If your dataset is in Google Drive
!cp -r /content/drive/MyDrive/path/to/dataset /content/dataset

# Or upload directly to Colab
from google.colab import files
uploaded = files.upload()  # For small files
                  
# For larger datasets, consider using zip files
!unzip dataset.zip -d /content/dataset`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  3. Install Dependencies
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`!pip install tensorflow tensorflow-hub matplotlib pillow scikit-learn`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  4. Prepare the Dataset
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`import tensorflow as tf
import os
import matplotlib.pyplot as plt
import numpy as np

# Set parameters
IMG_SIZE = 224  # Input size for most models
BATCH_SIZE = 32
EPOCHS = 15

# Create dataset
train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    '/content/dataset',
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE
)

validation_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    '/content/dataset',
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE
)

# Get class names
class_names = train_dataset.class_names
print("Classes:", class_names)

# Data augmentation for training
data_augmentation = tf.keras.Sequential([
  tf.keras.layers.RandomFlip('horizontal'),
  tf.keras.layers.RandomRotation(0.2),
  tf.keras.layers.RandomZoom(0.1),
])

# Optimize for performance
AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  5. Create and Train the Model
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Use transfer learning with a pre-trained model like MobileNetV2:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`# Create base model from MobileNetV2
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'
)

# Freeze the base model
base_model.trainable = False

# Create the model
model = tf.keras.Sequential([
    # Input layer
    tf.keras.layers.InputLayer(input_shape=(IMG_SIZE, IMG_SIZE, 3)),
    
    # Data augmentation
    data_augmentation,
    
    # Preprocessing
    tf.keras.layers.Rescaling(1./127.5, offset=-1),
    
    # Base model
    base_model,
    
    # Classification layers
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(len(class_names))
])

# Compile the model
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)

# Train the model
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS
)

# Fine-tuning (optional)
# Unfreeze the top layers of the base model
base_model.trainable = True
for layer in base_model.layers[:-4]:
    layer.trainable = False

# Recompile with a lower learning rate
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy']
)

# Continue training
history_fine = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=5
)

# Plot training results
acc = history.history['accuracy'] + history_fine.history['accuracy']
val_acc = history.history['val_accuracy'] + history_fine.history['val_accuracy']
epochs_range = range(EPOCHS + 5)

plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
loss = history.history['loss'] + history_fine.history['loss']
val_loss = history.history['val_loss'] + history_fine.history['val_loss']
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()`}
                  </pre>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("dataset")}
                className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
              >
                Back: Dataset
              </Button>
              <Button
                onClick={() => setActiveTab("export")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Next: Export
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Exporting Your Model for Web Use
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Convert your model to TensorFlow.js format for use in the browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  1. Save the TensorFlow Model
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`# Save the entire model
model.save('/content/plant_model')

# Save class names for later use
import json
with open('/content/class_names.json', 'w') as f:
    json.dump(class_names, f)`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  2. Install TensorFlow.js Converter
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`!pip install tensorflowjs`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  3. Convert the Model to TensorFlow.js Format
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`!mkdir -p /content/tfjs_model
!tensorflowjs_converter --input_format=tf_saved_model \\
                       --output_format=tfjs_graph_model \\
                       --signature_name=serving_default \\
                       --saved_model_tags=serve \\
                       /content/plant_model \\
                       /content/tfjs_model`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  4. Download the Converted Model
                </h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`# Zip the model files
!zip -r /content/tfjs_plant_model.zip /content/tfjs_model /content/class_names.json

# Download the zip file
from google.colab import files
files.download('/content/tfjs_plant_model.zip')`}
                  </pre>
                </div>
                <div className="flex items-center mt-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-600 dark:text-green-400">
                    Your model will be downloaded as a zip file containing the model.json and binary weight files
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  5. Host Your Model Files
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Upload your model files to a hosting service that supports CORS:
                </p>
                <ul className="list-disc list-inside text-green-600 dark:text-green-400 space-y-1">
                  <li>GitHub Pages</li>
                  <li>Vercel</li>
                  <li>Netlify</li>
                  <li>AWS S3</li>
                  <li>Google Cloud Storage</li>
                </ul>
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-amber-600 dark:text-amber-400">
                    Make sure CORS is enabled on your hosting service to allow loading the model from your app domain
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("training")}
                className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900"
              >
                Back: Export
              </Button>
              <Button
                onClick={() => setActiveTab("integration")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Next: Integration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                Integrating the Model with Eden
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Add your trained model to the Eden app for plant identification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  1. Install TensorFlow.js
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Add TensorFlow.js to your Next.js project:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`npm install @tensorflow/tfjs`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  2. Create a Model Loader Component
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Implement the model loading and prediction logic:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`// components/plant-model.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export function usePlantModel() {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load the model
  const loadModel = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load the model from your hosting service
      const loadedModel = await tf.loadGraphModel('https://your-model-url/model.json');
      setModel(loadedModel);
      
      // Load class names
      const response = await fetch('https://your-model-url/class_names.json');
      const names = await response.json();
      setClassNames(names);
      
      console.log('Plant identification model loaded successfully');
    } catch (err) {
      console.error('Error loading model:', err);
      setError('Failed to load the plant identification model');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Identify a plant from an image
  const identifyPlant = async (imageElement: HTMLImageElement) => {
    if (!model) {
      throw new Error('Model not loaded');
    }
    
    try {
      // Preprocess the image
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224]) // Resize to model input size
        .toFloat()
        .div(tf.scalar(127.5))
        .sub(tf.scalar(1))
        .expandDims();
      
      // Run prediction
      const predictions = await model.predict(tensor) as tf.Tensor;
      const data = await predictions.data();
      
      // Get the predicted class
      const classIndex = Array.from(data).indexOf(Math.max(...Array.from(data)));
      const className = classNames[classIndex];
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();
      
      // Parse the class name to extract plant type and growth stage
      // Format: "plantType_growthStage" (e.g., "tomato_seedling")
      const [plantType, growthStage] = className.split('_');
      
      return {
        className: plantType.charAt(0).toUpperCase() + plantType.slice(1),
        growthStage: growthStage.charAt(0).toUpperCase() + growthStage.slice(1),
        confidence: Math.max(...Array.from(data)),
      };
    } catch (err) {
      console.error('Error during prediction:', err);
      throw err;
    }
  };
  
  return {
    model,
    classNames,
    isLoading,
    error,
    loadModel,
    identifyPlant,
  };
}`}
                  </pre>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  3. Update the Scan Component
                </h3>
                <p className="text-green-600 dark:text-green-400">
                  Integrate the model with your scanning functionality:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <ScanPage />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                  4. Testing and Deployment
                </h3>
                <ul className="list-disc list-inside text-green-600 dark:text-green-400 space-y-1">
                  <li>Test your model with various plant images</li>
                  <li>Monitor performance and accuracy</li>
                  <li>Optimize model size if needed for faster loading</li>
                  <li>Consider implementing model caching for better performance</li>
                  <li>Deploy your updated app with the integrated AI model</li>
                </ul>
                <div className="flex items-center mt-4">
                  <BarChart className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-600 dark:text-green-400">
                    Track model performance metrics to continuously improve accuracy
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setActiveTab("export")}
                className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900 mr-auto"
              >
                Back: Export
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Guide
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}