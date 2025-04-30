# Drupal Auth Client

## Prerequisites

Make sure your Drupal site is using the [simple_oauth](https://www.drupal.org/project/simple_oauth) Drupal module.

## Usage

### Importing library

```javascript
import { drupalAuthClient } from "drupal-auth-client";
```

### Using `client_credentials`

```javascript
const client = drupalAuthClient("https://drupal.site", {
  clientId: "client_id",
  clientSecret: "client_secret",
});
```

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
