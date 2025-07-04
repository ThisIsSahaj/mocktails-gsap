# Mocktails Using GSAP

## Packages | npm i :
- gsap
- @gsap.react
- react-responsive : will help with animation logic and layer behaviour based on screen size
- tailwindcss @tailwindcss/vite
- lenis

## install
- FFMPEG - https://ffmpeg.org/
- in videos, we have frames only in a few seconds
- but for scrub based animations on a video, we need frames very frequently, i.e. we need every single frame to be a keyframe
- therefore we use FFMPEG to fix this issue

- you just need to download it in your system & run the following command

```
ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4
```