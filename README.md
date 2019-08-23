# kraft.ui

An UI prototyping tool for high-fidelity web and mobile app prototypes wireframes. UI components can be very modular.

<p align="left">
  <img src="Screenshot_1.jpeg" width="420">
  <img src="Screenshot_2.jpeg" width="420">
</p>

## _prerequisites

to install necessary `Nodejs` modules,

```bash
$ npm i
```

## _run

to fire up the app server,

```bash
$ npm start
```

## _docker

the easy way is to pull image from Docker Hub, so you don't have to do above the hard ways.

```bash
$ docker pull loouislow81/kraft-ui
```

run the container,

**(?)** you can replace mapped port `5566` to any unoccuppied port number, the default app port is `4646`,

```bash
$ docker run -it -d -p 5566:4646 loouislow81/kraft-ui
```

if you can't get the Docker Container fired up (but usually 100% worked), use the nerd way:

```bash
$ iptables --wait -t nat -A DOCKER -p tcp -d 0/0 --dport 5566 -j DNAT --to-destination 172.17.0.2:5566
```

run the container as system boot up forever,

```bash
$ docker run --restart=always -p 5566:4646 loouislow81/kraft-ui
```

remove the container,

```bash
$ docker rmi -f loouislow81/kraft-ui:latest
```

(( ! )) You can close the Terminal that running the Docker Container, the `kraft-ui` will keep running at background, until you restart the system or the Docker services.

---

MIT License

Copyright (c) 2018 Loouis Low

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
