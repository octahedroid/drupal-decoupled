<?php

use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Random;
use Drupal\Core\File\FileSystemInterface;

$random = new Random();
$consumerStorage = \Drupal::entityTypeManager()->getStorage('consumer');

$previewerClientId = Crypt::randomBytesBase64();
$previewerClientSecret = $random->word(8);
$consumerStorage->create([
  'client_id' => $previewerClientId,
  'client_secret ' => $previewerClientSecret,
  'label' => 'Previewer',
  'user_id' => 2,
  'third_party' => TRUE,
  'is_default' => FALSE,
  'roles' => ['previewer'],
])->save();

$viewerClientId = Crypt::randomBytesBase64();
$viewerClientSecret = $random->word(8);
$consumerStorage->create([
  'client_id' => $viewerClientId,
  'client_secret ' => $viewerClientSecret,
  'label' => 'Viewer',
  'user_id' => 2,
  'third_party' => TRUE,
  'is_default' => FALSE,
  'roles' => ['viewer'],
])->save();

$directory = '../keys';

if (create_directory($directory)) {
  echo 'Keys dir created succesfully' . PHP_EOL;
} else {
  echo 'Failed to create directory' . PHP_EOL;
}

\Drupal::service('simple_oauth.key.generator')->generateKeys($directory);

$messages = [
  'Consumers created successfully. Please save the following credentials.',
  '--- Previewer ---',
  'DRUPAL_CLIENT_ID=' . $previewerClientId,
  'DRUPAL_CLIENT_SECRET=' . $previewerClientSecret,
  '--- Viewer ---',
  'DRUPAL_CLIENT_ID=' . $viewerClientId,
  'DRUPAL_CLIENT_SECRET=' . $viewerClientSecret,
];

if (PHP_SAPI === 'cli') {
  echo PHP_EOL;
  foreach ($messages as $message) {
    echo $message . PHP_EOL;
  }
  echo PHP_EOL;
} else {

  foreach ($messages as $message) {
    \Drupal::messenger()->addWarning($message);
  }
}

function create_directory($directory)
{
  // Get the file system service.
  $file_system = \Drupal::service('file_system');

  // Check if the directory exists and create it if it doesn't.
  if (!$file_system->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS)) {
    return FALSE;
  }

  return TRUE;
}
