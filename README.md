[![Main-Docker](https://github.com/bcpdoc/exercisediary/actions/workflows/main-docker.yml/badge.svg)](https://github.com/bcpdoc/exercisediary/actions/workflows/main-docker.yml)
[![Go Report Card](https://goreportcard.com/badge/github.com/bcpdoc/exercisediary)](https://goreportcard.com/report/github.com/bcpdoc/exercisediary)
[![Maintainability](https://api.codeclimate.com/v1/badges/e8f67994120fc7936aeb/maintainability)](https://codeclimate.com/github/bcpdoc/ExerciseDiary/maintainability)
![Docker Image Size (latest semver)](https://img.shields.io/docker/image-size/bcpdoc/exercisediary)

<h1><a href="https://github.com/bcpdoc/exercisediary">
    <img src="https://raw.githubusercontent.com/bcpdoc/exercisediary/main/assets/logo.png" width="35" />
</a>Exercise Diary</h1>

Workout diary with GitHub-style year visualization

- [Quick start](https://github.com/bcpdoc/exercisediary#quick-start)
- [Binary](https://github.com/bcpdoc/exercisediary#binary)
- [Config](https://github.com/bcpdoc/exercisediary#config)
- [Options](https://github.com/bcpdoc/exercisediary#options)
- [Local network only](https://github.com/bcpdoc/exercisediary#local-network-only)
- [Roadmap](https://github.com/bcpdoc/ExerciseDiary/blob/main/docs/ROADMAP.md)
- [Thanks](https://github.com/bcpdoc/exercisediary#thanks)


![Screenshot](https://raw.githubusercontent.com/bcpdoc/ExerciseDiary/main/assets/Screenshot.png)

## Quick start

```sh
docker run --name exdiary \
-e "TZ=Asia/Novosibirsk" \
-v ~/.dockerdata/ExerciseDiary:/data/ExerciseDiary \
-p 8851:8851 \
bcpdoc/exercisediary
```
Or use [docker-compose.yml](docker-compose.yml)

## Binary
PPA for amd64 .deb is [here](https://github.com/bcpdoc/ppa). For other binary options plese look at the [latest release](https://github.com/bcpdoc/ExerciseDiary/releases/latest).


## Config


Configuration can be done through config file, GUI or environment variables. Variable names is `config.yaml` file are the same, but in lowcase.

| Variable  | Description | Default |
| --------  | ----------- | ------- |
| AUTH | Enable Session-Cookie authentication | false |
| AUTH_EXPIRE | Session expiration time. A number and suffix: **m, h, d** or **M**. | 7d |
| AUTH_USER | Username | "" |
| AUTH_PASSWORD | Encrypted password (bcrypt). [How to encrypt password with bcrypt?](docs/BCRYPT.md) | "" |
| HOST | Listen address | 0.0.0.0 |
| PORT   | Port for web GUI | 8851 |
| THEME | Any theme name from https://bootswatch.com in lowcase or [additional](https://github.com/bcpdoc/bcpdoc-bootswatch-fork) (emerald, grass, grayscale, ocean, sand, wood)| grass |
| COLOR | Background color: light or dark | light |
| HEATCOLOR | HeatMap color | #03a70c |
| PAGESTEP | Items on one page | 10 |
| TZ | Set your timezone for correct time | "" |

## Options

| Key  | Description | Default | 
| --------  | ----------- | ------- | 
| -d | Path to config dir | /data/ExerciseDiary | 
| -n | Path to local JS and Themes ([node-bootstrap](https://github.com/bcpdoc/my-dockerfiles/tree/main/node-bootstrap)) | "" | 

## Local network only
By default, this app pulls themes, icons and fonts from the internet. But, in some cases, it may be useful to have an independent from global network setup. I created a separate [image](https://github.com/bcpdoc/my-dockerfiles/tree/main/node-bootstrap) with all necessary modules and fonts.    
```sh
docker run --name node-bootstrap       \
    -v ~/.dockerdata/icons:/app/icons  \ # For local images
    -p 8850:8850                       \
    bcpdoc/node-bootstrap
```
```sh
docker run --name exdiary \
    -v ~/.dockerdata/ExerciseDiary:/data/ExerciseDiary \
    -p 8851:8851 \
    bcpdoc/exercisediary -n "http://$YOUR_IP:8850"
```
Or use [docker-compose](docker-compose-local.yml)

## Roadmap
Moved to [docs/ROADMAP.md](docs/ROADMAP.md)

## Thanks
- All go packages listed in [dependencies](https://github.com/bcpdoc/exercisediary/network/dependencies)
- [Bootstrap](https://getbootstrap.com/)
- Themes: [Free themes for Bootstrap](https://bootswatch.com)
- [Chart.js](https://github.com/chartjs/Chart.js) and [chartjs-chart-matrix](https://github.com/kurkle/chartjs-chart-matrix)
- Favicon and logo: [Flaticon](https://www.flaticon.com/icons/)