# svgToSprite

Dockerized spritezero. Create sprite files, with sdf option set, so `icon-color` works:

![icon-color](https://raw.githubusercontent.com/fxi/svgToSprite/master/img/mx_icon_color.gif "icon-color example");

Based on [spritezero readme](https://github.com/mapbox/spritezero)

1. Add your `*.svg` files in a `svg` folder
2. Create a `dist` folder
3. Run Docker : `docker run -v $(pwd)/dist:/dist -v $(pwd)/svg:/svg fredmoser/svg_to_sprite:latest`


