#!/bin/bash

wp-env run cli wp theme activate twentytwentythree
wp-env run cli wp rewrite structure /%postname%
wp-env run cli wp option update blogname "Search & Replace for Block Editor"
wp-env run cli wp option update blogdescription "Search and Replace text within the Block Editor."
