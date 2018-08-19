# Making of the gif

## Credits

* [Terminalizer](https://github.com/faressoft/terminalizer)
* [OS X Screencast to animated GIF](https://gist.github.com/dergachev/4627207)

## Conversion of MOV to GIF

    ffmpeg -i demo4k.mov -s 800x600 -pix_fmt rgb8 -r 10 -f gif - | gifsicle --optimize=3 --delay=3 > out.gif
