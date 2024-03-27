# Drupal Auth Client

## Prerequisites

Make sure your Drupal site is using the [simple_oauth](https://www.drupal.org/project/simple_oauth) Drupal module.

## Usage

### Importing library

```javascript
import { drupalAuthClient } from "drupal-auth-client"
```

### Using `client_credentials`

```javascript

const client = drupalAuthClient(
  "https://drupal.site",
  "client_credentials",
  {
    clientId: "client_id",
    clientSecret: "client_secret",
  },
)
```

### Using `password`

```javascript

const client = drupalAuthClient(
  "https://drupal.site",
  "password",
  {
    username: "username",
    password: "password",
    clientId: "client_id",
    clientSecret: "client_secret",
  },
)
```

## Supporting organizations

Development sponsored by [Octahedroid](https://octahedroid.com/)
