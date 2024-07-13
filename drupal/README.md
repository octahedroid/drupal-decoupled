# Drupal decoupled recipes

This folder contains a set of recipes according to the [recipes initiative](https://www.drupal.org/project/distributions_recipes), designed to configure Drupal as a headless CMS ready to be integrated with a Frontend application.

Make sure to check the README files for each recipe for more information about installation and usage.



# Recipe installation process

This guide shows how to install a Drupal decoupled recipe according to the [Recipes Initiative](https://www.drupal.org/project/distributions_recipes).

## Require and apply the recipe. 

>  [!caution]
>
>  Drupal recipes had been added to the core as experimental in `10.3` and above. The following instructions will be based on this assumption. 

### Requirements 

A clean Drupal codebase where you should be able to install a `minimal` Drupal installation. There are a couple of ways to achieve this :

- [DDEV (recommended)](https://ddev.readthedocs.io/en/stable/users/quickstart/#drupal)
- [Lando](https://docs.lando.dev/plugins/drupal/getting-started.html#quick-start)
- [Composer](https://www.drupal.org/docs/develop/using-composer/manage-dependencies#s-create-a-project)

Each of these options has requirements. We encourage you to review their corresponding `Getting Started` sections.

> [!note]
>
> There are pre-configured project templates for popular Drupal hosting platforms. We strongly recommend starting the setup process besides the local development experience you choose. The recipe apply process should be the same:
>
> - [Pantheon](https://docs.pantheon.io/drupal-10#create-a-drupal-10-site)
> - [Acquia](https://github.com/acquia/drupal-recommended-project)
> - [Platform.sh](https://github.com/platformsh-templates/drupal10)



We will follow a setup using DDEV and drupal/recommended-project as a template for illustration purposes.

### Getting Drupal

```bash
mkdir my-drupal-site && cd my-drupal-site
ddev config --project-type=drupal --php-version=8.3 --docroot=web
ddev start
ddev composer create drupal/recommended-project:^10
ddev config --update
ddev composer require drush/drush

```

### Configure `composer.json`

In the composer.json `extra` section, add `drupal-recipe` to `installer-types`:

```json
"extra": {
    "installer-types": [
        "drupal-recipe"
    ],
}

```

This tells composer to expect a new "type" defined in the recipe's composer.json file called `drupal-recipe`.

Also, in the `extra` section, add the `installer-path` for the type `drupal-recipe`:

```json
"installer-paths": {
    "web/core": ["type:drupal-core"],
    "web/modules/contrib/{$name}": ["type:drupal-module"],
    "web/profiles/contrib/{$name}": ["type:drupal-profile"],
		.	
		.
		.
    "web/recipes/{$name}": ["type:drupal-recipe"]
},

```

This tells composer to install a `drupal-recipe` type package in the web/recipes folder when it encounters one.

> [!important]
>
> Some packages are in active development, and the Drupal composer template uses the `minimum-stability`  in `stable` , we should change that to install all the modules. 

```
"minimum-stability": "dev",
```

### Configure .gitignore

Since we are installing recipes using composer, you will want to exclude the path we added previously.

```
/web/recipes
```

### Require the recipe

```
ddev composer require octahedroid/[drupal-decoupled-recipe]
```

### Applying the recipe

Recipes are applied using core's PHP Drupal script. In your CLI, cd into your webroot, and run the following command:

```
ddev exec -d /var/www/html/web php core/scripts/drupal recipe recipes/custom/[drupal-decoupled-recipe]
```

## Unpack the recipe

This is an optional step. However, these recipes are intended to be a starting point for your Drupal project, and we strongly recommend unpacking the recipe and, with that, integrating the dependencies into your main project's composer.json file.

The https://github.com/woredeyonas/Drupal-Recipe-Unpack composer plugin can be run after you apply a recipe.

The plugin is not on Packagist, so you must first install the repository in your site's composer.json.

```json
{
    "type": "vcs",
    "url": "https://github.com/woredeyonas/Drupal-Recipe-Unpack.git"
}
```

Run the install of the package.

```bash
ddev composer require ewcomposer/unpack:dev-master
```

When using Composer 2.2 or higher, Composer will ask for your permission to allow this plugin to execute code.

Add the following lines to your site's composer.json file's `config` > `allow-plugins` section.

```json
{
    "config": {
        "allow-plugins": {
            "ewcomposer/unpack": true,
        }
    }
}
```

Then, unpack the recipe with the following command. 

```bash
ddev composer unpack octahedroid/[drupal-decoupled-recipe]
```

After this, the dependencies have been added to your main composer.json 
