<?php
use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Random;

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

\Drupal::service('simple_oauth.key.generator')->generateKeys('../');

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
